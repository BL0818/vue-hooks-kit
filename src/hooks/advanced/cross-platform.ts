import { ref, computed, type Ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useWindowSize as useVueUseWindowSize } from '@vueuse/core';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
  'xs': 0,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
};

/**
 * useWindowSize - Cross-platform window size with UnoCSS/Tailwind breakpoints
 * 
 * @returns Object containing width, height, and current breakpoint
 */
export function useWindowSize() {
  const { width, height } = useVueUseWindowSize();

  const currentBreakpoint = computed<Breakpoint>(() => {
    const w = width.value;
    if (w >= breakpoints['2xl']) return '2xl';
    if (w >= breakpoints['xl']) return 'xl';
    if (w >= breakpoints['lg']) return 'lg';
    if (w >= breakpoints['md']) return 'md';
    if (w >= breakpoints['sm']) return 'sm';
    return 'xs';
  });

  const isMobile = computed(() => width.value < breakpoints.md);
  const isTablet = computed(() => width.value >= breakpoints.md && width.value < breakpoints.lg);
  const isDesktop = computed(() => width.value >= breakpoints.lg);

  // Helper to generate responsive classes dynamically if needed
  // e.g. useWindowSize().responsiveClass({ sm: 'p-4', lg: 'p-8' })
  const responsiveClass = (classes: Partial<Record<Breakpoint, string>>) => {
    // Logic: Find the largest breakpoint that is active and return its class
    // This mimics CSS media query behavior (min-width)
    const activeBp = currentBreakpoint.value;
    // We need to check all breakpoints <= activeBp
    // Order: 2xl -> xl -> lg -> md -> sm -> xs
    const bps: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    
    // Find index of current active
    const activeIndex = bps.indexOf(activeBp);
    
    // Check from active down to xs
    for (let i = activeIndex; i < bps.length; i++) {
      const bp = bps[i];
      if (classes[bp]) {
        return classes[bp];
      }
    }
    return '';
  };

  return {
    width,
    height,
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    responsiveClass,
  };
}
