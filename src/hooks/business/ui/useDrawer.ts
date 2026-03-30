import { ref, type Ref } from 'vue'
import { useVisibleControl } from './useVisibleControl'

export interface UseDrawerOptions {
  defaultVisible?: boolean
  destroyOnClose?: boolean
  position?: 'left' | 'right' | 'top' | 'bottom'
}

export interface DrawerClasses {
  overlay: string
  content: string
  header: string
  body: string
  footer: string
  closeBtn: string
  title: string
}

// Position class map — static constant
const POSITION_CLASSES: Record<string, string> = {
  left: 'left-0 h-full w-80',
  right: 'right-0 h-full w-80',
  top: 'top-0 w-full h-80',
  bottom: 'bottom-0 w-full h-80',
}

// Module-level constant — avoids re-creation on every call
const BASE_DRAWER_CLASSES: Omit<DrawerClasses, 'content'> = {
  overlay: 'fixed inset-0 bg-black/50 z-50 transition-opacity',
  header: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between',
  body: 'p-6 flex-1 overflow-y-auto',
  footer: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50',
  closeBtn: 'text-gray-400 hover:text-gray-500 focus:outline-none',
  title: 'text-lg font-medium text-gray-900',
}

export function useDrawer<T = unknown>(options: UseDrawerOptions = {}) {
  const { defaultVisible = false, destroyOnClose = false, position = 'right' } = options

  const { visible, params, open, close, toggle } = useVisibleControl<T>({
    defaultVisible,
    destroyOnClose,
  })

  const positionClass = POSITION_CLASSES[position] ?? POSITION_CLASSES.right

  const classes: DrawerClasses = {
    ...BASE_DRAWER_CLASSES,
    content: `fixed bg-white shadow-xl transition-transform transform ${positionClass} z-50 flex flex-col`,
  }

  return {
    visible,
    params,
    open,
    close,
    toggle,
    classes
  }
}
