import { ref, customRef, watch, type Ref } from 'vue'

// --- Storage Hooks ---

interface StorageOptions<T> {
  serializer?: {
    read: (raw: string) => T
    write: (value: T) => string
  }
  expire?: number // 过期时间（毫秒）
}

function isExpiredStorageObject(obj: unknown): obj is { value: unknown; expire: number } {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'value' in obj &&
    'expire' in obj
  )
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
  let initialized = false

  // 初始化：从 storage 读取（不触发 watch 写回）
  try {
    const raw = storage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (isExpiredStorageObject(parsed)) {
        const now = Date.now()
        if (parsed.expire && now > parsed.expire) {
          storage.removeItem(key)
        } else {
          data.value = parsed.value as T
        }
      } else {
        // 兼容旧数据或直接存储的数据 — 使用 serializer
        data.value = serializer.read(raw)
      }
      initialized = true
    }
  } catch (e) {
    console.warn(e)
  }

  // 监听变化（仅在用户修改时写入，不使用 immediate）
  watch(
    data,
    (newValue) => {
      // Skip first write if data was just loaded from storage
      if (!initialized) {
        initialized = true
        return
      }

      try {
        if (newValue === null || newValue === undefined) {
          storage.removeItem(key)
        } else if (expire) {
          const wrapped = { value: newValue, expire: Date.now() + expire }
          storage.setItem(key, serializer.write(wrapped as T))
        } else {
          storage.setItem(key, serializer.write(newValue))
        }
      } catch (e) {
        console.warn(e)
      }
    },
    { deep: true }
  )

  // Mark as initialized after first user-triggered change
  // If storage was empty, the next change should write
  if (!initialized) {
    initialized = true
  }

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
