import { ref, watch } from 'vue'

export interface UseModalOptions {
  defaultVisible?: boolean
  destroyOnClose?: boolean
}

export interface ModalClasses {
  overlay: string
  content: string
  header: string
  body: string
  footer: string
  closeBtn: string
  title: string
}

export function useModal<T = any>(options: UseModalOptions = {}) {
  const { defaultVisible = false, destroyOnClose = false } = options

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

  const classes: ModalClasses = {
    overlay: 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-opacity',
    content: 'bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 transform transition-all',
    header: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between',
    body: 'p-6',
    footer: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50 rounded-b-lg',
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
