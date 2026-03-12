import { ref, unref, watch, onUnmounted, type Ref, shallowRef } from 'vue'
import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosError, CanceledError } from 'axios'

// 简单的内存缓存
const cache = new Map<string, { data: any; expire: number }>()

export interface UseRequestOptions<T = any> {
  manual?: boolean
  initialData?: T
  onSuccess?: (data: T, params: any[]) => void
  onError?: (error: unknown, params: any[]) => void
  onFinally?: () => void
  cacheKey?: string
  cacheTime?: number // 毫秒
  retryCount?: number
  retryDelay?: number
  loadingKeep?: number // loading 状态保持至少多长时间，避免闪烁
}

export function useRequest<T = any>(
  service: AxiosRequestConfig | ((...args: any[]) => AxiosRequestConfig | Promise<T>),
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
  
  let abortController: AbortController | null = null
  let retryTimes = 0
  let loadingTimer: ReturnType<typeof setTimeout> | null = null

  const cancel = () => {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
  }

  const runAsync = async (...params: any[]): Promise<T> => {
    // 检查缓存
    if (cacheKey) {
      const cached = cache.get(cacheKey)
      if (cached && cached.expire > Date.now()) {
        data.value = cached.data
        onSuccess?.(cached.data, params)
        return cached.data
      }
    }

    cancel() // 取消上一次请求
    abortController = new AbortController()

    const startTime = Date.now()
    loading.value = true
    error.value = undefined

    try {
      let config: AxiosRequestConfig
      if (typeof service === 'function') {
        const result = service(...params)
        if (result instanceof Promise) {
          // 如果传入的是返回 Promise 的函数（非纯 Axios 配置构建器）
          // 我们这里简单处理，无法自动注入 signal，除非用户自己处理
          // 但如果是返回 config，我们可以处理
          // 这里假设如果是 Promise，就是直接调用的结果，我们无法 cancel 除非用户逻辑支持
          // 为了严谨，我们主要支持 AxiosRequestConfig
           // 但为了兼容性，如果返回 Promise，直接 await
           const res = await result
           data.value = res
           if (cacheKey) {
             cache.set(cacheKey, { data: res, expire: Date.now() + cacheTime })
           }
           onSuccess?.(res, params)
           return res
        }
        config = result
      } else {
        config = service
      }

      // 注入 signal
      const res = await axios({
        ...config,
        signal: abortController.signal,
      })

      const resData = res.data
      data.value = resData
      
      if (cacheKey) {
        cache.set(cacheKey, { data: resData, expire: Date.now() + cacheTime })
      }

      onSuccess?.(resData, params)
      return resData
    } catch (err: any) {
      if (err instanceof CanceledError) {
        // 被取消，不视为错误
        return new Promise(() => {}) // 永不 resolve
      }

      // 重试逻辑
      if (retryTimes < retryCount) {
        retryTimes++
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        return runAsync(...params)
      }

      error.value = err
      onError?.(err, params)
      throw err
    } finally {
      retryTimes = 0 // 重置重试计数（如果成功或最终失败）
      const duration = Date.now() - startTime
      if (duration < loadingKeep) {
        loadingTimer = setTimeout(() => {
          loading.value = false
          onFinally?.()
        }, loadingKeep - duration)
      } else {
        loading.value = false
        onFinally?.()
      }
    }
  }

  const run = (...params: any[]) => {
    runAsync(...params).catch((err) => {
      console.error('useRequest error:', err)
    })
  }

  const refresh = () => {
    // 这里参数可能丢失，如果需要 refresh，可能需要保存上一次的 params
    // 简单起见，暂不支持带参数的自动 refresh，或者假设无参
    // 更好的做法是保存 lastParams
    run() 
  }

  if (!manual) {
    run()
  }

  onUnmounted(() => {
    cancel()
    if (loadingTimer) clearTimeout(loadingTimer)
  })

  return {
    data,
    error,
    loading,
    run,
    runAsync,
    cancel,
    refresh,
  }
}
