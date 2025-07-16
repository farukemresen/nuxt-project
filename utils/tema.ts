// utils/theme.ts
import { useColorMode } from '#imports'
import { computed } from 'vue'

export function useThemeToggle() {
  const colorMode = useColorMode()

  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set(_isDark: boolean) {
      colorMode.preference = _isDark ? 'dark' : 'light'
    },
  })

  return {
    isDark,
    colorMode,
  }
}
