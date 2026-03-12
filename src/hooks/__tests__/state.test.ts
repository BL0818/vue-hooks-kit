import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCounter, useLocalStorage, useDebouncedRef } from '../basic/state'
import { nextTick, ref } from 'vue'

describe('State Hooks', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

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

    it('should work with min/max', () => {
      const [count, { inc, dec }] = useCounter(10, { min: 0, max: 15 })
      inc(10)
      expect(count.value).toBe(15) // capped at max
      dec(20)
      expect(count.value).toBe(0) // capped at min
    })
  })

  describe('useLocalStorage', () => {
    it('should store and retrieve values', () => {
      const storage = useLocalStorage('test-key', 'default')
      expect(storage.value).toBe('default')
      
      storage.value = 'new-value'
      // Wait for watch callback
      return nextTick().then(() => {
        expect(localStorage.getItem('test-key')).toContain('new-value')
      })
    })

    it('should handle expiration', () => {
      vi.useFakeTimers()
      const now = Date.now()
      vi.setSystemTime(now)
      
      const storage = useLocalStorage('expire-key', 'default', { expire: 1000 })
      storage.value = 'temp-value'
      
      // Wait for storage write
      return nextTick().then(() => {
        // Fast-forward time past expiration
        vi.setSystemTime(now + 1500)
        
        // Re-initialize to simulate page reload/new component mount
        const storage2 = useLocalStorage('expire-key', 'default', { expire: 1000 })
        
        // It should have expired and returned default
        // However, since we are in the same test run, storage2 is a new ref.
        // The implementation reads from localStorage on init.
        // If expired, it removes item and uses default.
        // Then the watcher immediately writes the default value back to storage with a new expiration.
        expect(storage2.value).toBe('default')
        
        const raw = localStorage.getItem('expire-key')
        expect(raw).not.toBeNull()
        if (raw) {
          const parsed = JSON.parse(raw)
          expect(parsed.value).toBe('default')
        }
        
        vi.useRealTimers()
      })
    })
  })

  describe('useDebouncedRef', () => {
    it('should debounce value changes', () => {
      vi.useFakeTimers()
      const val = useDebouncedRef('initial', 100)
      
      expect(val.value).toBe('initial')
      val.value = 'updated'
      
      // Should not update immediately (sync access to value might return old value or new value depending on implementation)
      // CustomRef implementation:
      // get() returns value. set() sets timeout to update value.
      // So immediately after set, get() should return old value.
      expect(val.value).toBe('initial') 
      
      vi.advanceTimersByTime(150)
      expect(val.value).toBe('updated')
      vi.useRealTimers()
    })
  })
})
