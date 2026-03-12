import { reactive, readonly } from 'vue'

// Singleton state
const state = reactive({
  theme: 'light',
  sidebarOpen: true,
  loading: false
})

const actions = {
  toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
    // Toggle UnoCSS dark mode class
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  toggleSidebar() {
    state.sidebarOpen = !state.sidebarOpen
  },
  setLoading(val: boolean) {
    state.loading = val
  }
}

export function useGlobalState() {
  return {
    state: readonly(state),
    ...actions
  }
}
