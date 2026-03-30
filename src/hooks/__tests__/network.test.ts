import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRequest } from '../basic/network'
import { nextTick } from 'vue'

import axios, { CanceledError } from 'axios'

// Mock axios module
vi.mock('axios')

describe('useRequest', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should execute request automatically when manual=false', async () => {
    vi.mocked(axios).mockResolvedValue({ data: 'success' })

    const { data, loading } = useRequest({ url: '/api/test' })

    expect(loading.value).toBe(true)
    expect(data.value).toBeUndefined()

    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(loading.value).toBe(false)
    expect(data.value).toBe('success')
  })

  it('should support manual execution', async () => {
    vi.mocked(axios).mockResolvedValue({ data: 'manual' })

    const { data, loading, run } = useRequest(
      { url: '/api/manual' },
      { manual: true }
    )

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
    vi.mocked(axios).mockRejectedValue(error)

    const { error: errRef, loading, run } = useRequest(
      { url: '/api/error' },
      { manual: true }
    )

    await run()
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(loading.value).toBe(false)
    expect(errRef.value).toBe(error)
  })
})
