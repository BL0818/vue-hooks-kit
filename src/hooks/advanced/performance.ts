import { shallowRef, triggerRef, customRef, type Ref, type ShallowRef } from 'vue';

/**
 * useMemoizedFn - Create a persistent function that maintains the same reference
 * ensuring the latest implementation is always called.
 * 
 * Performance Optimization:
 * - Avoids unnecessary re-renders in child components due to function prop changes.
 * - Especially useful when passing callbacks to optimized child components (memoized).
 * 
 * @param fn The function to be memoized
 * @returns A persistent function reference
 */
export function useMemoizedFn<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = shallowRef<T>(fn);

  // Keep the ref updated with the latest function implementation
  fnRef.value = fn;

  const memoizedFn = ((...args: any[]) => {
    return fnRef.value(...args);
  }) as T;

  return memoizedFn;
}

/**
 * useReactiveRef - Performance optimized deep reactive state
 * 
 * Optimization Strategy:
 * - Uses `shallowRef` internally to avoid deep proxy conversion overhead.
 * - Provides a `mutate` method to batch updates and manually trigger reactivity.
 * - Suitable for large data structures or high-frequency update scenarios where
 *   Vue's default deep reactivity might cause performance issues.
 * 
 * @param initialState Initial state
 * @returns Object containing the shallow ref and a mutate function
 */
export function useReactiveRef<T>(initialState: T) {
  const state = shallowRef(initialState);

  /**
   * Mutate the state and trigger reactivity.
   * This allows modifying deep properties without the overhead of deep reactivity proxies.
   * 
   * @param mutator Function to modify the state
   */
  const mutate = (mutator: (state: T) => void) => {
    mutator(state.value);
    triggerRef(state);
  };

  return {
    state,
    mutate,
  };
}

/**
 * useLazyRef - Lazy initialization for Ref
 * 
 * Optimization Strategy:
 * - Delays the creation/calculation of the initial value until the `.value` is first accessed.
 * - Useful for expensive initializations or resources that might not be needed immediately.
 * 
 * @param factory Factory function to create the initial value
 * @returns A Ref that initializes lazily
 */
export function useLazyRef<T>(factory: () => T): Ref<T> {
  let value: T | undefined;
  let initialized = false;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        if (!initialized) {
          value = factory();
          initialized = true;
        }
        return value as T;
      },
      set(newValue) {
        value = newValue;
        initialized = true;
        trigger();
      },
    };
  });
}
