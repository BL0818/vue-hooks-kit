import { reactive, readonly } from 'vue'

// --- isClient helper ---

const isClient = typeof window !== 'undefined'

// Singleton state
const state = reactive({
  theme: 'light' as 'light' | 'dark',
  sidebarOpen: true,
  loading: false
})

const toggleTheme = () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light'
  // Toggle UnoCSS dark mode class (SSR safe)
  if (isClient) {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

const toggleSidebar = () => {
  state.sidebarOpen = !state.sidebarOpen
}

const setLoading = (val: boolean) => {
  state.loading = val
}

const actions = {
  toggleTheme,
  toggleSidebar,
  setLoading,
}

export function useGlobalState() {
  return {
    state: readonly(state),
    ...actions
  }
}
