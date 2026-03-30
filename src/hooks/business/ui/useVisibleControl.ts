import { ref, type Ref } from 'vue'

/**
 * useVisibleControl - Internal hook for managing visible/open/close/toggle logic.
 *
 * Shared by useModal and useDrawer to eliminate code duplication (DRY).
 *
 * @internal
 */
export interface UseVisibleControlReturn<T = unknown> {
  visible: Ref<boolean>
  params: Ref<T | null>
  open: (args?: T) => void
  close: () => void
  toggle: () => void
}

export interface UseVisibleControlOptions {
  defaultVisible?: boolean
  destroyOnClose?: boolean
}

export function useVisibleControl<T = unknown>(
  options: UseVisibleControlOptions = {}
): UseVisibleControlReturn<T> {
  const { defaultVisible = false, destroyOnClose = false } = options

  const visible = ref(defaultVisible)
  const params = ref<T | null>(null) as Ref<T | null>

  const open = (args?: T) => {
    visible.value = true
    if (args !== undefined) params.value = args
  }

  const close = () => {
    visible.value = false
    if (destroyOnClose) {
      params.value = null
    }
  }

  const toggle = () => {
    visible.value = !visible.value
  }

  return { visible, params, open, close, toggle }
}
