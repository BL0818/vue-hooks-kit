import { useDark, useToggle } from '@vueuse/core'

export function useAppTheme() {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
