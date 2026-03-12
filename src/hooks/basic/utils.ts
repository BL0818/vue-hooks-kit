import { ref, onUnmounted, type Ref, unref } from 'vue'

// --- useDebounceFn ---

export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  wait: number = 200
): T {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debounced = ((...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }) as T

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return debounced
}

// --- useThrottleFn ---

export function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  wait: number = 200
): T {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  const throttled = ((...args: any[]) => {
    const now = Date.now()
    if (now - lastTime >= wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn(...args)
      lastTime = now
    } else if (!timer) {
      timer = setTimeout(() => {
        fn(...args)
        lastTime = Date.now()
        timer = null
      }, wait - (now - lastTime))
    }
  }) as T

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return throttled
}

// --- useRAF ---

export function useRAF(
  fn: (timestamp: number) => void,
  options: { immediate?: boolean } = {}
) {
  const { immediate = true } = options
  const isActive = ref(false)
  let rafId: number | null = null

  const loop = (timestamp: number) => {
    if (!isActive.value) return
    fn(timestamp)
    rafId = requestAnimationFrame(loop)
  }

  const resume = () => {
    if (!isActive.value) {
      isActive.value = true
      rafId = requestAnimationFrame(loop)
    }
  }

  const pause = () => {
    isActive.value = false
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  if (immediate) {
    resume()
  }

  onUnmounted(pause)

  return { isActive, resume, pause }
}

// --- useTimeoutFn ---

export function useTimeoutFn(
  cb: () => void,
  interval: number | Ref<number>,
  options: { immediate?: boolean } = {}
) {
  const { immediate = true } = options
  const isPending = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isPending.value = false
  }

  const start = (...args: any[]) => {
    clear()
    isPending.value = true
    timer = setTimeout(() => {
      isPending.value = false
      timer = null
      cb()
    }, unref(interval))
  }

  if (immediate) {
    start()
  }

  onUnmounted(clear)

  return { isPending, start, stop: clear }
}
