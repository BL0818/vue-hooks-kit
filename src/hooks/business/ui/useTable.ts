import { ref, reactive, computed, watch, unref } from 'vue'
import { usePagination, type UsePaginationOptions } from '../data/usePagination'

export interface TableResponse<T = any> {
  list: T[]
  total: number
}

export interface UseTableOptions<T = any> {
  fetchData: (params: any) => Promise<TableResponse<T>>
  pagination?: UsePaginationOptions
  defaultParams?: Record<string, any>
  manual?: boolean
  rowKey?: string | ((record: T) => string)
}

export interface TableClasses {
  table: string
  thead: string
  tbody: string
  tr: string
  th: string
  td: string
  empty: string
  loading: string
  selection: string
  sorter: string
}

export function useTable<T = any>(options: UseTableOptions<T>) {
  const {
    fetchData,
    pagination: paginationOptions = {},
    defaultParams = {},
    manual = false,
    rowKey = 'id',
  } = options

  const loading = ref(false)
  const data = ref<T[]>([]) as any
  const error = ref<any>(null)
  
  // Pagination
  const {
    current,
    pageSize,
    total,
    changeCurrent,
    changePageSize,
    setTotal,
    classes: paginationClasses
  } = usePagination(paginationOptions)

  // Filters & Sorter
  const filters = reactive<Record<string, any>>({ ...defaultParams })
  const sorter = reactive<{ field: string; order: 'asc' | 'desc' | null }>({
    field: '',
    order: null,
  })

  // Selection
  const selectedRowKeys = ref<string[]>([])
  const selectedRows = ref<T[]>([]) as any

  const getRowKey = (record: T): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return (record as any)[rowKey]
  }

  const handleSelectionChange = (rows: T[]) => {
    selectedRows.value = rows
    selectedRowKeys.value = rows.map(getRowKey)
  }

  const clearSelection = () => {
    selectedRows.value = []
    selectedRowKeys.value = []
  }

  // Fetch Logic
  const run = async (params: any = {}) => {
    loading.value = true
    error.value = null
    try {
      const queryParams = {
        page: current.value,
        size: pageSize.value,
        ...filters,
        ...params,
        sortField: sorter.field,
        sortOrder: sorter.order,
      }
      
      const res = await fetchData(queryParams)
      data.value = res.list
      setTotal(res.total)
    } catch (err) {
      error.value = err
      console.error('Table fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  const refresh = () => {
    // Keep current page
    return run()
  }

  const reset = () => {
    // Reset filters and page
    current.value = 1
    // Reset filters to default? Or clear?
    // Here we reset to initial defaultParams if needed, or just keep current filters but reset page
    // Let's reset page to 1 and reload
    return run()
  }

  // Watchers
  watch([current, pageSize], () => {
    run()
  })

  // Sorter helper
  const handleSort = (field: string, order: 'asc' | 'desc' | null) => {
    sorter.field = field
    sorter.order = order
    run()
  }

  // Filter helper
  const handleFilter = (newFilters: Record<string, any>) => {
    Object.assign(filters, newFilters)
    current.value = 1 // Reset to first page on filter change
    run()
  }

  // Initial load
  if (!manual) {
    run()
  }

  // UnoCSS Classes for Table
  const classes: TableClasses = {
    table: 'w-full text-left border-collapse',
    thead: 'bg-gray-50 text-gray-700 uppercase text-xs font-semibold',
    tbody: 'divide-y divide-gray-200',
    tr: 'hover:bg-gray-50 transition-colors',
    th: 'px-4 py-3 border-b border-gray-200 whitespace-nowrap',
    td: 'px-4 py-3 border-b border-gray-200 text-sm text-gray-600',
    empty: 'flex flex-col items-center justify-center py-12 text-gray-400',
    loading: 'absolute inset-0 bg-white/50 z-10 flex items-center justify-center',
    selection: 'w-4',
    sorter: 'ml-1 inline-flex flex-col gap-0.5 cursor-pointer text-gray-400 hover:text-gray-600',
  }

  return {
    data,
    loading,
    error,
    pagination: {
      current,
      pageSize,
      total,
      changeCurrent,
      changePageSize,
      classes: paginationClasses
    },
    filters,
    sorter,
    selectedRowKeys,
    selectedRows,
    run,
    refresh,
    reset,
    handleSelectionChange,
    clearSelection,
    handleSort,
    handleFilter,
    classes
  }
}
