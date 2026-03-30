import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'
import { useLocalStorage } from './state'
import { useEventListener } from './dom'

// --- isClient helper ---

const isClient = typeof window !== 'undefined'

// --- useThemeMode ---

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface UseThemeModeOptions {
  selector?: string // default: 'html'
  attribute?: string // default: 'data-theme'
  storageKey?: string // default: 'vue-hooks-kit-theme'
}

export function useThemeMode(options: UseThemeModeOptions = {}) {
  const {
    selector = 'html',
    attribute = 'data-theme',
    storageKey = 'vue-hooks-kit-theme',
  } = options

  const mode = useLocalStorage<ThemeMode>(storageKey, 'auto')
  const systemDark = ref(false)

  // Initialize system preference after mount (SSR safe)
  if (isClient) {
    systemDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const updateSystemTheme = (e: Event) => {
    systemDark.value = (e as MediaQueryListEvent).matches
  }

  if (isClient) {
    useEventListener(
      window.matchMedia('(prefers-color-scheme: dark)'),
      'change',
      updateSystemTheme
    )
  }

  watch(
    [mode, systemDark],
    () => {
      if (!isClient) return

      const el = document.querySelector(selector)
      if (!el) return

      let currentMode = mode.value
      if (currentMode === 'auto') {
        currentMode = systemDark.value ? 'dark' : 'light'
      }

      if (attribute === 'class') {
        if (currentMode === 'dark') {
          el.classList.add('dark')
        } else {
          el.classList.remove('dark')
        }
      } else {
        el.setAttribute(attribute, currentMode)
      }
    },
    { immediate: true, flush: 'post' }
  )

  return {
    mode,
    systemDark,
    toggle: () => {
      mode.value = mode.value === 'dark' ? 'light' : 'dark'
    },
    set: (v: ThemeMode) => {
      mode.value = v
    }
  }
}

// --- useResponsive ---

// Default Tailwind/UnoCSS breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type BreakpointKey = keyof typeof breakpoints

export function useResponsive() {
  const current = ref<BreakpointKey | undefined>(undefined)
  const matches = ref<Record<BreakpointKey, boolean>>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  })

  const update = () => {
    if (!isClient) return

    const width = window.innerWidth
    let matched: BreakpointKey | undefined = undefined

    // Sort breakpoints descending
    const sorted = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]) as [BreakpointKey, number][]

    for (const [key, val] of sorted) {
      if (width >= val) {
        if (!matched) matched = key
        matches.value[key] = true
      } else {
        matches.value[key] = false
      }
    }
    current.value = matched
  }

  if (isClient) {
    useEventListener(window, 'resize', update)

    onMounted(() => {
      update()
    })
  }

  return {
    current,
    matches,
    breakpoints
  }
}
