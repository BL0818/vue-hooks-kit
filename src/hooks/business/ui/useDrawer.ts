import { ref } from 'vue'

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

export function useDrawer<T = any>(options: UseDrawerOptions = {}) {
  const { defaultVisible = false, destroyOnClose = false, position = 'right' } = options

  const visible = ref(defaultVisible)
  const params = ref<T | null>(null)

  const open = (args?: T) => {
    visible.value = true
    if (args) params.value = args
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

  // Generate UnoCSS classes based on position
  const getPositionClass = () => {
    switch (position) {
      case 'left': return 'left-0 h-full w-80'
      case 'right': return 'right-0 h-full w-80'
      case 'top': return 'top-0 w-full h-80'
      case 'bottom': return 'bottom-0 w-full h-80'
      default: return 'right-0 h-full w-80'
    }
  }

  const classes: DrawerClasses = {
    overlay: 'fixed inset-0 bg-black/50 z-50 transition-opacity',
    content: `fixed bg-white shadow-xl transition-transform transform ${getPositionClass()} z-50 flex flex-col`,
    header: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between',
    body: 'p-6 flex-1 overflow-y-auto',
    footer: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50',
    closeBtn: 'text-gray-400 hover:text-gray-500 focus:outline-none',
    title: 'text-lg font-medium text-gray-900',
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
