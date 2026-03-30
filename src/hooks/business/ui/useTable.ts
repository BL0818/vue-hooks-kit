import { ref, reactive, computed, watch, unref, type Ref } from 'vue'
import { usePagination, type UsePaginationOptions } from '../data/usePagination'

export interface TableResponse<T = any> {
  list: T[]
  total: number
}

export interface UseTableOptions<T = any> {
  fetchData: (params: Record<string, unknown>) => Promise<TableResponse<T>>
  pagination?: UsePaginationOptions
  defaultParams?: Record<string, unknown>
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

export function useTable<T extends Record<string, unknown> = Record<string, unknown>>(
  options: UseTableOptions<T>
) {
  const {
    fetchData,
    pagination: paginationOptions = {},
    defaultParams = {},
    manual = false,
    rowKey = 'id',
  } = options

  const loading = ref(false)
  const data: Ref<T[]> = ref([])
  const error = ref<unknown>(null)

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
  const filters = reactive<Record<string, unknown>>({ ...defaultParams })
  const sorter = reactive<{ field: string; order: 'asc' | 'desc' | null }>({
    field: '',
    order: null,
  })

  // Selection
  const selectedRowKeys = ref<string[]>([])
  const selectedRows: Ref<T[]> = ref([])

  // Track whether a programmatic run is pending to avoid watch double-trigger
  let programmaticRunPending = false

  const getRowKey = (record: T): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return String((record as Record<string, unknown>)[rowKey] ?? '')
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
  const run = async (extraParams: Record<string, unknown> = {}) => {
    loading.value = true
    error.value = null
    try {
      const queryParams: Record<string, unknown> = {
        page: current.value,
        size: pageSize.value,
        ...filters,
        ...extraParams,
        sortField: sorter.field,
        sortOrder: sorter.order,
      }

      const res = await fetchData(queryParams)
      data.value = res.list
      setTotal(res.total)
    } catch (err: unknown) {
      error.value = err
      console.error('Table fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  const refresh = () => {
    return run()
  }

  const reset = () => {
    // Reset filters to defaults
    Object.keys(filters).forEach(key => {
      if (key in defaultParams) {
        filters[key] = defaultParams[key]
      } else {
        delete filters[key]
      }
    })
    // Reset sorter
    sorter.field = ''
    sorter.order = null
    clearSelection()
    // Reset page to 1
    if (current.value === 1) {
      run()
    } else {
      programmaticRunPending = true
      current.value = 1
    }
  }

  // Watch pagination changes — sole driver for data fetching
  watch([current, pageSize], () => {
    if (programmaticRunPending) {
      programmaticRunPending = false
      // run() will be called by this watch, no need for separate invocation
    }
    run()
  })

  // Sorter helper
  const handleSort = (field: string, order: 'asc' | 'desc' | null) => {
    sorter.field = field
    sorter.order = order
    run()
  }

  // Filter helper — if current changes, watch triggers run(). Otherwise call run() directly.
  const handleFilter = (newFilters: Record<string, unknown>) => {
    Object.assign(filters, newFilters)
    if (current.value === 1) {
      // current won't change, so watch won't fire — call run() directly
      run()
    } else {
      programmaticRunPending = true
      current.value = 1 // Triggers watch → run()
    }
  }

  // Initial load
  if (!manual) {
    run()
  }

  // UnoCSS Classes for Table (module-level constant)
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
