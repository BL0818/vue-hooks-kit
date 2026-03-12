import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import { useEventListener, useBasicWindowSize, useClickOutside, useElementSize } from '../basic/dom'

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('DOM Hooks', () => {
  describe('useEventListener', () => {
    it('should register and cleanup event listener', async () => {
      const target = document.createElement('div')
      const spy = vi.fn()
      
      const Component = {
        setup() {
          useEventListener(target, 'click', spy)
        },
        template: '<div></div>'
      }

      const wrapper = mount(Component)
      target.dispatchEvent(new Event('click'))
      expect(spy).toHaveBeenCalledTimes(1)

      wrapper.unmount()
      target.dispatchEvent(new Event('click'))
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('useBasicWindowSize', () => {
    it('should react to window resize', async () => {
      let width, height
      const Component = {
        setup() {
          const size = useBasicWindowSize()
          width = size.width
          height = size.height
          return {}
        },
        template: '<div></div>'
      }
      
      mount(Component)
      
      expect(width.value).toBe(window.innerWidth)
      expect(height.value).toBe(window.innerHeight)

      window.innerWidth = 500
      window.innerHeight = 500
      window.dispatchEvent(new Event('resize'))
      
      await nextTick()
      expect(width.value).toBe(500)
      expect(height.value).toBe(500)
    })
  })

  describe('useClickOutside', () => {
    it('should detect click outside', async () => {
      const handler = vi.fn()
      const targetEl = document.createElement('div')
      document.body.appendChild(targetEl)
      
      const Component = {
        setup() {
          const target = ref(targetEl)
          useClickOutside(target, handler)
          return { target }
        },
        template: '<div></div>'
      }

      const wrapper = mount(Component)
      
      // Click inside
      targetEl.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }))
      expect(handler).not.toHaveBeenCalled()
      
      // Click outside
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }))
      expect(handler).toHaveBeenCalledTimes(1)

      wrapper.unmount()
      document.body.removeChild(targetEl)
    })
  })

  describe('useElementSize', () => {
    it('should track element size', async () => {
      const el = document.createElement('div')
      const target = ref(el)
      let width, height
      
      const Component = {
        setup() {
          const size = useElementSize(target)
          width = size.width
          height = size.height
          return {}
        },
        template: '<div></div>'
      }
      
      mount(Component)
      
      expect(width.value).toBe(0)
      expect(height.value).toBe(0)
      
      // Since we mocked ResizeObserver, we can't test actual resizing without mocking the observer callback execution.
      // But we can test that it initializes.
    })
  })
})
