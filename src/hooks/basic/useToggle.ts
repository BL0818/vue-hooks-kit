import { ref, type UnwrapRef } from 'vue'

export interface UseToggleActions<T, U> {
  setLeft: () => void
  setRight: () => void
  toggle: (value?: T | U) => void
  set: (value: T | U) => void
}

/**
 * useToggle
 * Used to toggle state between two values.
 *
 * @param defaultValue Default value (default: false)
 * @param reverseValue Reverse value (default: !defaultValue)
 */
export function useToggle<T = boolean, U = boolean>(
  defaultValue: T = false as unknown as T,
  reverseValue?: U,
) {
  const state = ref<T | U>(defaultValue)
  const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as U

  const toggle = (value?: T | U) => {
    // If a value is provided, force set to that value
    if (value !== undefined) {
      state.value = value as UnwrapRef<T | U>
      return
    }
    // Toggle between default and reverse values
    state.value = (state.value === defaultValue
      ? reverseValueOrigin
      : defaultValue) as UnwrapRef<T | U>
  }

  const setLeft = () => {
    state.value = defaultValue as UnwrapRef<T | U>
  }

  const setRight = () => {
    state.value = reverseValueOrigin as UnwrapRef<T | U>
  }

  const set = (value: T | U) => {
    state.value = value as UnwrapRef<T | U>
  }

  const actions: UseToggleActions<T, U> = {
    toggle,
    setLeft,
    setRight,
    set,
  }

  return [state, actions] as const
}
