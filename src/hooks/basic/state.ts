import { ref, customRef, watch, type Ref } from 'vue'

// --- Storage Hooks ---

interface StorageOptions<T> {
  serializer?: {
    read: (raw: string) => T
    write: (value: T) => string
  }
  expire?: number // 过期时间（毫秒）
}

function useStorage<T>(
  key: string,
  defaultValue: T,
  storage: Storage,
  options: StorageOptions<T> = {}
) {
  const {
    serializer = {
      read: (raw: string) => JSON.parse(raw) as T,
      write: (value: T) => JSON.stringify(value),
    },
    expire,
  } = options

  const data = ref<T>(defaultValue) as Ref<T>

  // 初始化
  try {
    const raw = storage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw)
      // 检查是否包含过期时间结构
      if (parsed && typeof parsed === 'object' && 'value' in parsed && 'expire' in parsed) {
        const now = Date.now()
        if (parsed.expire && now > parsed.expire) {
          storage.removeItem(key)
        } else {
          data.value = parsed.value
        }
      } else {
        // 兼容旧数据或直接存储的数据
        data.value = serializer.read(raw)
      }
    }
  } catch (e) {
    console.warn(e)
  }

  // 监听变化
  watch(
    data,
    (newValue) => {
      try {
        if (newValue === null || newValue === undefined) {
          storage.removeItem(key)
        } else {
          const storedValue = {
            value: newValue,
            expire: expire ? Date.now() + expire : null,
          }
          storage.setItem(key, JSON.stringify(storedValue))
        }
      } catch (e) {
        console.warn(e)
      }
    },
    { deep: true, immediate: true } // 立即执行以确保初始值被写入（如果需要）
  )

  return data
}

export function useLocalStorage<T>(key: string, defaultValue: T, options?: StorageOptions<T>) {
  return useStorage(key, defaultValue, localStorage, options)
}

export function useSessionStorage<T>(key: string, defaultValue: T, options?: StorageOptions<T>) {
  return useStorage(key, defaultValue, sessionStorage, options)
}

// --- Ref Hooks ---

export function useDebouncedRef<T>(value: T, delay = 200) {
  let timeout: ReturnType<typeof setTimeout>
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

export function useThrottledRef<T>(value: T, delay = 200) {
  let timeout: ReturnType<typeof setTimeout>
  let lastExec = 0
  
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        const now = Date.now()
        if (now - lastExec >= delay) {
          value = newValue
          lastExec = now
          trigger()
        } else {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                value = newValue
                lastExec = Date.now()
                trigger()
            }, delay - (now - lastExec))
        }
      },
    }
  })
}

// --- Counter Hook ---

export interface UseCounterOptions {
  min?: number
  max?: number
}

export interface UseCounterActions {
  inc: (delta?: number) => void
  dec: (delta?: number) => void
  set: (value: number | ((c: number) => number)) => void
  reset: () => void
}

export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {}
): [Ref<number>, UseCounterActions] {
  const { min, max } = options
  const current = ref(initialValue)

  const set = (value: number | ((c: number) => number)) => {
    const nextValue = typeof value === 'function' ? (value as (c: number) => number)(current.value) : value
    if (typeof min === 'number' && nextValue < min) {
      current.value = min
      return
    }
    if (typeof max === 'number' && nextValue > max) {
      current.value = max
      return
    }
    current.value = nextValue
  }

  const inc = (delta = 1) => {
    set(current.value + delta)
  }

  const dec = (delta = 1) => {
    set(current.value - delta)
  }

  const reset = () => {
    set(initialValue)
  }

  return [current, { inc, dec, set, reset }]
}
