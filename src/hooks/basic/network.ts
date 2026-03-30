import { ref, unref, watch, onUnmounted, type Ref, shallowRef } from 'vue'
import axios, { type AxiosRequestConfig, CanceledError } from 'axios'

export interface UseRequestOptions<T = unknown> {
  manual?: boolean
  initialData?: T
  onSuccess?: (data: T, params: unknown[]) => void
  onError?: (error: unknown, params: unknown[]) => void
  onFinally?: () => void
  cacheKey?: string
  cacheTime?: number // ms
  retryCount?: number
  retryDelay?: number
  loadingKeep?: number // ms — keep loading state for at least this duration to avoid flicker
}

interface CacheEntry<T> {
  data: T
  expire: number
}

export function useRequest<T = unknown>(
  service: AxiosRequestConfig | ((...args: unknown[]) => AxiosRequestConfig | Promise<T>),
  options: UseRequestOptions<T> = {}
) {
  const {
    manual = false,
    initialData,
    onSuccess,
    onError,
    onFinally,
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    retryCount = 0,
    retryDelay = 1000,
    loadingKeep = 0,
  } = options

  const data = shallowRef<T | undefined>(initialData)
  const error = shallowRef<unknown | undefined>(undefined)
  const loading = ref(false)

  // Per-instance cache (avoids module-level memory leak)
  const cache = new Map<string, CacheEntry<T>>()

  let abortController: AbortController | null = null
  let retryTimes = 0
  let loadingTimer: ReturnType<typeof setTimeout> | null = null

  const clearLoadingTimer = () => {
    if (loadingTimer) {
      clearTimeout(loadingTimer)
      loadingTimer = null
    }
  }

  const cancel = () => {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
  }

  const finishLoading = () => {
    loading.value = false
    retryTimes = 0
    onFinally?.()
  }

  const runAsync = async (...params: unknown[]): Promise<T> => {
    // Check cache
    if (cacheKey) {
      const cached = cache.get(cacheKey)
      if (cached && cached.expire > Date.now()) {
        data.value = cached.data
        onSuccess?.(cached.data, params)
        return cached.data
      }
      // Expired entry cleanup
      if (cached) {
        cache.delete(cacheKey)
      }
    }

    cancel() // Cancel previous request
    abortController = new AbortController()

    const startTime = Date.now()
    loading.value = true
    error.value = undefined

    try {
      let config: AxiosRequestConfig
      if (typeof service === 'function') {
        const result = service(...params)
        if (result instanceof Promise) {
          // If the service function returns a Promise directly (not an AxiosRequestConfig),
          // we cannot inject the AbortController signal.
          // Await it directly for compatibility.
          const res = await result
          if (abortController?.signal.aborted) return new Promise<T>(() => {})

          data.value = res as T
          if (cacheKey) {
            cache.set(cacheKey, { data: res as T, expire: Date.now() + cacheTime })
          }
          onSuccess?.(res as T, params)
          return res as T
        }
        config = result
      } else {
        config = service
      }

      // Inject signal for cancellation
      const res = await axios({
        ...config,
        signal: abortController.signal,
      })

      if (abortController?.signal.aborted) return new Promise<T>(() => {})

      const resData = res.data as T
      data.value = resData

      if (cacheKey) {
        cache.set(cacheKey, { data: resData, expire: Date.now() + cacheTime })
      }

      onSuccess?.(resData, params)
      return resData
    } catch (err: unknown) {
      if (err instanceof CanceledError) {
        // Cancelled — don't treat as error, never resolve
        return new Promise<T>(() => {})
      }

      // Retry logic
      if (retryTimes < retryCount) {
        retryTimes++
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        return runAsync(...params)
      }

      error.value = err
      onError?.(err, params)
      throw err
    } finally {
      // Only reset retryTimes and loading after the entire retry chain completes
      const duration = Date.now() - startTime
      if (duration < loadingKeep) {
        loadingTimer = setTimeout(() => {
          finishLoading()
        }, loadingKeep - duration)
      } else {
        finishLoading()
      }
    }
  }

  const run = (...params: unknown[]) => {
    runAsync(...params).catch((err: unknown) => {
      console.error('useRequest error:', err)
    })
  }

  const refresh = () => {
    run()
  }

  // Clear cache entries (public API for manual cleanup)
  const clearCache = () => {
    cache.clear()
  }

  if (!manual) {
    run()
  }

  onUnmounted(() => {
    cancel()
    clearLoadingTimer()
    cache.clear()
  })

  return {
    data,
    error,
    loading,
    run,
    runAsync,
    cancel,
    refresh,
    clearCache,
  }
}
