import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'

// Mock usePagination to avoid deep dependency
vi.mock('../data/usePagination', () => ({
  usePagination: (opts: Record<string, unknown> = {}) => {
    const current = ref(1)
    const pageSize = ref((opts.pageSize as number) ?? 10)
    const total = ref(0)
    return {
      current,
      pageSize,
      total,
      changeCurrent: (page: number) => { current.value = page },
      changePageSize: (size: number) => { pageSize.value = size },
      setTotal: (t: number) => { total.value = t },
      classes: {},
    }
  },
}))

import { useTable } from '../useTable'
import type { TableResponse, UseTableOptions } from '../useTable'

// Test row type that satisfies Record<string, unknown>
interface UserRow {
  id: number
  name: string
  [key: string]: unknown
}

// Mock data
const mockResponse: TableResponse<UserRow> = {
  list: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  total: 2,
}

// Spy wrapper — avoids vi.fn generic type issues
function createFetchSpy() {
  const spy = vi.fn()
  spy.mockResolvedValue({ ...mockResponse })
  return spy
}

// Helper to clear spy calls with proper type narrowing
function clearSpy(spy: ReturnType<typeof vi.fn>) {
  spy.mockClear()
}

// Type-safe assertion for the call count
function getCallCount(spy: ReturnType<typeof vi.fn>): number {
  return spy.mock.calls.length
}

describe('useTable', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should NOT fetch data on mount when manual=true', async () => {
    const fetchData = createFetchSpy()
    useTable({ fetchData: fetchData as UseTableOptions<UserRow>['fetchData'], manual: true })

    await nextTick()
    expect(getCallCount(fetchData)).toBe(0)
  })

  it('should fetch data on mount when manual=false', async () => {
    const fetchData = createFetchSpy()
    useTable({ fetchData: fetchData as UseTableOptions<UserRow>['fetchData'], manual: false })

    await nextTick()
    expect(getCallCount(fetchData)).toBe(1)
  })

  describe('handleFilter — must trigger exactly ONE API call', () => {
    it('calls fetchData exactly once when handleFilter is called', async () => {
      const fetchData = createFetchSpy()
      const { handleFilter } = useTable({
        fetchData: fetchData as UseTableOptions<UserRow>['fetchData'],
        manual: true,
      })

      await nextTick()
      clearSpy(fetchData)

      handleFilter({ status: 'active' })

      await nextTick()
      await nextTick()

      // CRITICAL: Must be exactly 1, NOT 2 (the pre-fix bug)
      expect(getCallCount(fetchData)).toBe(1)
    })

    it('calls fetchData exactly once when handleFilter changes current from >1 to 1', async () => {
      const fetchData = createFetchSpy()
      const table = useTable({
        fetchData: fetchData as UseTableOptions<UserRow>['fetchData'],
        manual: true,
      })

      await nextTick()

      table.pagination.changeCurrent(3)
      await nextTick()

      clearSpy(fetchData)

      table.handleFilter({ status: 'active' })

      await nextTick()
      await nextTick()

      expect(getCallCount(fetchData)).toBe(1)
    })
  })

  describe('reset — must trigger exactly ONE API call', () => {
    it('calls fetchData exactly once when reset changes current to 1', async () => {
      const fetchData = createFetchSpy()
      const table = useTable({
        fetchData: fetchData as UseTableOptions<UserRow>['fetchData'],
        manual: true,
      })

      await nextTick()

      table.pagination.changeCurrent(3)
      await nextTick()

      clearSpy(fetchData)

      table.reset()

      await nextTick()
      await nextTick()

      expect(getCallCount(fetchData)).toBe(1)
    })
  })

  describe('typed data — no as any in source', () => {
    it('should return typed data array', async () => {
      const fetchData = createFetchSpy()
      const { data, run } = useTable({
        fetchData: fetchData as UseTableOptions<UserRow>['fetchData'],
        manual: true,
      })

      await nextTick()
      clearSpy(fetchData)

      await run()
      await nextTick()

      expect(data.value).toHaveLength(2)
      expect(data.value[0].name).toBe('Alice')
      expect(data.value[0].id).toBe(1)
    })
  })

  describe('selection', () => {
    it('should track selected rows by key', () => {
      const fetchData = createFetchSpy()
      const { selectedRows, selectedRowKeys, handleSelectionChange } = useTable({
        fetchData: fetchData as UseTableOptions<UserRow>['fetchData'],
        manual: true,
        rowKey: 'id',
      })

      handleSelectionChange([{ id: 1, name: 'Alice' }])

      expect(selectedRows.value).toHaveLength(1)
      expect(selectedRowKeys.value).toEqual(['1'])
    })

    it('should clear selection', () => {
      const fetchData = createFetchSpy()
      const { selectedRows, selectedRowKeys, handleSelectionChange, clearSelection } = useTable({
        fetchData: fetchData as UseTableOptions<UserRow>['fetchData'],
        manual: true,
      })

      handleSelectionChange([{ id: 1, name: 'Alice' }])
      expect(selectedRows.value).toHaveLength(1)

      clearSelection()
      expect(selectedRows.value).toHaveLength(0)
      expect(selectedRowKeys.value).toHaveLength(0)
    })

    it('should support function rowKey', () => {
      const fetchData = createFetchSpy()
      const { selectedRowKeys, handleSelectionChange } = useTable({
        fetchData: fetchData as UseTableOptions<UserRow>['fetchData'],
        manual: true,
        rowKey: (record) => `user-${record.id}`,
      })

      handleSelectionChange([{ id: 1, name: 'Alice' }])
      expect(selectedRowKeys.value).toEqual(['user-1'])
    })
  })
})
