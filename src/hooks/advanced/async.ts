import { ref, shallowRef, toRaw, watch, type Ref, type ShallowRef } from 'vue';

interface AsyncOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

interface AsyncReturn<T> {
  loading: Ref<boolean>;
  data: ShallowRef<T | null>;
  error: ShallowRef<any | null>;
  execute: (...args: any[]) => Promise<T | null>;
  cancel: () => void;
}

/**
 * useAsync - Async function wrapper with state management
 * 
 * Features:
 * - Automatic loading/error state management
 * - Cancellation support (via AbortController or simple flag)
 * - Immediate execution option
 * - Success/Error callbacks
 * 
 * @param fn Async function to execute
 * @param options Configuration options
 */
export function useAsync<T>(
  fn: (...args: any[]) => Promise<T>,
  options: AsyncOptions<T> = {}
): AsyncReturn<T> {
  const loading = ref(false);
  const data = shallowRef<T | null>(null);
  const error = shallowRef<any | null>(null);
  
  // AbortController for cancellation if the environment supports it
  let abortController: AbortController | null = null;

  const execute = async (...args: any[]) => {
    // Cancel previous request if running
    if (loading.value) {
      cancel();
    }

    loading.value = true;
    error.value = null;
    
    abortController = new AbortController();
    const signal = abortController.signal;

    try {
      // Pass signal to fn if it accepts it? 
      // Ideally fn should accept signal, but for generic usage we just manage state.
      // If the user wants real cancellation, they should check the signal or we wrap.
      // Here we just ignore the result if cancelled.
      
      const result = await fn(...args);
      
      if (signal.aborted) return null;

      data.value = result;
      options.onSuccess?.(result);
      return result;
    } catch (err: any) {
      if (signal.aborted) return null;
      
      error.value = err;
      options.onError?.(err);
      return null;
    } finally {
      if (!signal.aborted) {
        loading.value = false;
        abortController = null;
      }
    }
  };

  const cancel = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    loading.value = false;
  };

  if (options.immediate) {
    execute();
  }

  return {
    loading,
    data,
    error,
    execute,
    cancel,
  };
}

/**
 * usePromise - Manage a Promise's lifecycle
 * 
 * Wraps a Promise factory to provide reactive state.
 * Similar to useAsync but focused on Promise objects/factories.
 * 
 * @param promiseFactory Factory function returning a Promise
 */
export function usePromise<T>(promiseFactory: () => Promise<T>) {
  const { loading, data, error, execute } = useAsync(promiseFactory);
  
  // Automatically execute on creation
  execute();
  
  return { loading, data, error, refresh: execute };
}
