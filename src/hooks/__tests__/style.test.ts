import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { useThemeMode, useResponsive } from '../basic/style'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('Style Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
  })

  describe('useThemeMode', () => {
    it('should toggle theme', async () => {
      let mode, toggle
      const Component = {
        setup() {
          const theme = useThemeMode({ storageKey: 'test-theme' })
          mode = theme.mode
          toggle = theme.toggle
          return {}
        },
        template: '<div></div>'
      }
      
      mount(Component)
      await nextTick()
      
      // Default auto, system dark is false (mocked) -> light
      // But implementation sets attribute to 'light' if auto and system is light?
      // Wait, my implementation:
      // if (currentMode === 'auto') { currentMode = systemDark.value ? 'dark' : 'light' }
      // el.setAttribute(attribute, currentMode)
      
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      
      // Set to dark
      mode.value = 'dark'
      await nextTick()
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      
      // Toggle
      toggle()
      await nextTick()
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })
  })

  describe('useResponsive', () => {
    it('should detect breakpoints', async () => {
      let current
      const Component = {
        setup() {
          const resp = useResponsive()
          current = resp.current
          return {}
        },
        template: '<div></div>'
      }
      
      mount(Component)
      
      // Mock window.innerWidth
      window.innerWidth = 800 // > md (768) < lg (1024)
      window.dispatchEvent(new Event('resize'))
      
      await nextTick()
      expect(current.value).toBe('md')
      
      window.innerWidth = 1200 // > lg (1024)
      window.dispatchEvent(new Event('resize'))
      
      await nextTick()
      expect(current.value).toBe('lg')
    })
  })
})
