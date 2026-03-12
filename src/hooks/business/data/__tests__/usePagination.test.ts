import { describe, it, expect } from 'vitest'
import { usePagination } from '../usePagination'

describe('usePagination', () => {
  it('should initialize with default values', () => {
    const { current, pageSize, total, offset } = usePagination()
    expect(current.value).toBe(1)
    expect(pageSize.value).toBe(10)
    expect(total.value).toBe(0)
    expect(offset.value).toBe(0)
  })

  it('should change current page', () => {
    const { current, changeCurrent, total } = usePagination({ total: 100 })
    changeCurrent(2)
    expect(current.value).toBe(2)
    changeCurrent(20) // out of bounds (100/10 = 10 pages)
    expect(current.value).toBe(10) 
    changeCurrent(0) // out of bounds
    expect(current.value).toBe(1)
  })

  it('should calculate offset correctly', () => {
    const { current, offset } = usePagination({ defaultCurrent: 2, defaultPageSize: 20 })
    expect(offset.value).toBe(20)
  })
})
