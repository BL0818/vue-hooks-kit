import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRequest } from '../basic/network'
import axios from 'axios'
import { nextTick } from 'vue'

vi.mock('axios')

describe('useRequest', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should execute request automatically', async () => {
    (axios as any).mockResolvedValue({ data: 'success' })
    
    const { data, loading } = useRequest({ url: '/api/test' })
    
    expect(loading.value).toBe(true)
    expect(data.value).toBeUndefined()
    
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 0)) // Wait for promise
    
    expect(loading.value).toBe(false)
    expect(data.value).toBe('success')
  })

  it('should support manual execution', async () => {
    (axios as any).mockResolvedValue({ data: 'manual' })
    
    const { data, loading, run } = useRequest({ url: '/api/manual' }, { manual: true })
    
    expect(loading.value).toBe(false)
    expect(data.value).toBeUndefined()
    
    run()
    expect(loading.value).toBe(true)
    
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(data.value).toBe('manual')
  })

  it('should handle error', async () => {
    const error = new Error('fail')
    ;(axios as any).mockRejectedValue(error)
    
    const { error: errRef, loading } = useRequest({ url: '/api/error' })
    
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(loading.value).toBe(false)
    expect(errRef.value).toBe(error)
  })
})
