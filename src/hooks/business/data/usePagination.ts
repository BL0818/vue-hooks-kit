import { ref, computed } from 'vue'

export interface UsePaginationOptions {
  defaultCurrent?: number
  defaultPageSize?: number
  total?: number
  pageSizes?: number[]
}

export interface PaginationClasses {
  container: string
  total: string
  pager: string
  item: string
  itemActive: string
  prev: string
  next: string
  sizes: string
  jumper: string
}

export function usePagination(options: UsePaginationOptions = {}) {
  const {
    defaultCurrent = 1,
    defaultPageSize = 10,
    total: initialTotal = 0,
    pageSizes = [10, 20, 50, 100],
  } = options

  const current = ref(defaultCurrent)
  const pageSize = ref(defaultPageSize)
  const total = ref(initialTotal)

  const offset = computed(() => (current.value - 1) * pageSize.value)
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  const changeCurrent = (page: number) => {
    if (page < 1) page = 1
    if (page > totalPages.value && totalPages.value > 0) page = totalPages.value
    current.value = page
  }

  const changePageSize = (size: number) => {
    pageSize.value = size
    // Reset to page 1 or keep current offset? Usually reset to 1 is safer to avoid empty pages
    if (current.value * size > total.value) {
      changeCurrent(1)
    }
  }

  const setTotal = (val: number) => {
    total.value = val
    // Adjust current page if out of bounds
    if (current.value > totalPages.value && totalPages.value > 0) {
      current.value = totalPages.value
    }
  }

  // UnoCSS style classes for a standard pagination component
  const classes: PaginationClasses = {
    container: 'flex items-center justify-end gap-2 py-4',
    total: 'text-gray-500 text-sm',
    pager: 'flex items-center gap-1',
    item: 'px-3 py-1 rounded border border-gray-200 cursor-pointer hover:border-primary hover:text-primary transition-colors',
    itemActive: 'bg-primary text-white border-primary',
    prev: 'px-2 py-1 rounded border border-gray-200 cursor-pointer hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed',
    next: 'px-2 py-1 rounded border border-gray-200 cursor-pointer hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed',
    sizes: 'border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-primary',
    jumper: 'flex items-center gap-1 text-sm text-gray-500',
  }

  return {
    current,
    pageSize,
    total,
    pageSizes,
    offset,
    totalPages,
    changeCurrent,
    changePageSize,
    setTotal,
    classes,
  }
}
