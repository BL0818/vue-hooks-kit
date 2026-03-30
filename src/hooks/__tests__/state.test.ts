import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useLocalStorage, useSessionStorage, useCounter, useDebouncedRef, useThrottledRef } from '../basic/state'
import { nextTick } from 'vue'

import type { StorageOptions } from '../basic/state'

describe('State Hooks', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // --- useCounter ---

  describe('useCounter', () => {
    it('should work with default values', () => {
      const [count, { inc, dec, set, reset }] = useCounter(10)
      expect(count.value).toBe(10)
      inc()
      expect(count.value).toBe(11)
      dec()
      expect(count.value).toBe(10)
      set(20)
      expect(count.value).toBe(20)
      reset()
      expect(count.value).toBe(10)
    })

    it('should respect min/max bounds', () => {
      const [count, { inc, dec }] = useCounter(10, { min: 0, max: 15 })
      inc(10)
      expect(count.value).toBe(15) // capped at max
      dec(20)
      expect(count.value).toBe(0) // capped at min
    })
  })

  // --- useLocalStorage ---

  describe('useLocalStorage', () => {
    it('should store and retrieve values', () => {
      const storage = useLocalStorage('test-key', 'default')
      expect(storage.value).toBe('default')

      storage.value = 'new-value'
      return nextTick().then(() => {
        const raw = localStorage.getItem('test-key')
        expect(raw).not.toBeNull()
        if (raw) {
          // New format: serializer.write stores the value directly (JSON.stringify by default)
          const parsed = JSON.parse(raw)
          expect(parsed).toBe('new-value')
        }
      })
    })

    it('should NOT overwrite existing storage data on initialization', () => {
      // Pre-populate with existing data in the old { value, expire } wrapper format
      localStorage.setItem('existing-key', JSON.stringify({ value: 'existing-data', expire: null }))

      const storage = useLocalStorage('existing-key', 'default')
      expect(storage.value).toBe('existing-data')
    })

    it('should NOT write to storage on init when loading existing data', async () => {
      localStorage.setItem('preexisting-key', JSON.stringify({ value: 'saved-data', expire: null }))

      const storage = useLocalStorage('preexisting-key', 'default')
      expect(storage.value).toBe('saved-data')

      await nextTick()
      // Storage should NOT have been overwritten
      const raw = localStorage.getItem('preexisting-key')
      expect(raw).toBe(JSON.stringify({ value: 'saved-data', expire: null }))
    })

    it('should use custom serializer for writing', async () => {
      const writeFn = vi.fn((value: unknown) => JSON.stringify({ custom: value }))
      const readFn = vi.fn((raw: string) => {
        const parsed = JSON.parse(raw)
        return parsed.custom
      })

      const storage = useLocalStorage('serialized-key', 'default', {
        serializer: { read: readFn, write: writeFn },
      })

      storage.value = 'custom-value'

      await nextTick()

      // serializer.write should have been called
      expect(writeFn).toHaveBeenCalled()
    })

    it('should clear expired data', () => {
      const now = Date.now()
      vi.setSystemTime(now)

      // Manually set expired data
      localStorage.setItem('expired-key', JSON.stringify({ value: 'old-data', expire: now - 1000 }))

      const storage = useLocalStorage('expired-key', 'default', { expire: 500 })
      expect(storage.value).toBe('default')
    })
  })

  // --- useSessionStorage ---

  describe('useSessionStorage', () => {
    it('should store and retrieve values from sessionStorage', () => {
      const storage = useSessionStorage('session-key', 'default')
      expect(storage.value).toBe('default')

      storage.value = 'session-value'
      return nextTick().then(() => {
        const raw = sessionStorage.getItem('session-key')
        expect(raw).not.toBeNull()
        if (raw) {
          const parsed = JSON.parse(raw)
          expect(parsed).toBe('session-value')
        }
      })
    })
  })

  // --- useDebouncedRef ---

  describe('useDebouncedRef', () => {
    it('should debounce value changes', () => {
      const val = useDebouncedRef('initial', 100)

      expect(val.value).toBe('initial')
      val.value = 'updated'

      // Should not update immediately
      expect(val.value).toBe('initial')

      vi.advanceTimersByTime(150)
      expect(val.value).toBe('updated')
    })
  })

  // --- useThrottledRef ---

  describe('useThrottledRef', () => {
    it('should throttle rapid value changes', () => {
      const val = useThrottledRef('initial', 100)

      expect(val.value).toBe('initial')

      // First change should apply immediately
      val.value = 'change-1'
      expect(val.value).toBe('change-1')

      // Rapid subsequent change should be throttled
      val.value = 'change-2'
      expect(val.value).toBe('change-1')

      // After delay, the throttled value should apply
      vi.advanceTimersByTime(150)
      expect(val.value).toBe('change-2')
    })
  })
})
