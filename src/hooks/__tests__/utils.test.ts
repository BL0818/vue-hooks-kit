import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useDebounceFn, useThrottleFn, useTimeoutFn } from '../basic/utils'

describe('Utils Hooks', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('useDebounceFn', () => {
    it('should debounce function call', () => {
      const spy = vi.fn()
      let debounced
      
      const Component = {
        setup() {
          debounced = useDebounceFn(spy, 100)
          return {}
        },
        template: '<div></div>'
      }
      
      mount(Component)
      
      debounced()
      debounced()
      debounced()
      
      expect(spy).not.toHaveBeenCalled()
      
      vi.advanceTimersByTime(100)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('useTimeoutFn', () => {
    it('should execute callback after timeout', () => {
      const spy = vi.fn()
      
      const Component = {
        setup() {
          useTimeoutFn(spy, 100)
          return {}
        },
        template: '<div></div>'
      }
      
      mount(Component)
      
      expect(spy).not.toHaveBeenCalled()
      vi.advanceTimersByTime(100)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
