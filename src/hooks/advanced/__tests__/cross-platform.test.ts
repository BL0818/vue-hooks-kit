import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWindowSize } from '../cross-platform';
import { ref } from 'vue';

const width = ref(1024);
const height = ref(768);

vi.mock('@vueuse/core', async () => {
  return {
    useWindowSize: () => ({ width, height }),
  };
});

describe('Cross-Platform Hooks', () => {
  describe('useWindowSize', () => {
    it('should detect breakpoints correctly', () => {
      width.value = 1024; // lg
      const { currentBreakpoint, isDesktop } = useWindowSize();
      
      expect(currentBreakpoint.value).toBe('lg');
      expect(isDesktop.value).toBe(true);
      
      width.value = 768; // md
      expect(currentBreakpoint.value).toBe('md');
      expect(isDesktop.value).toBe(false); // < 1024
      
      width.value = 375; // xs
      expect(currentBreakpoint.value).toBe('xs');
    });

    it('should return correct responsive class', () => {
      width.value = 1024; // lg
      const { responsiveClass } = useWindowSize();
      
      const classes = {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-8',
      };
      
      // Since currentBreakpoint is reactive but responsiveClass is a function using .value
      // wait, responsiveClass accesses currentBreakpoint.value inside?
      // Yes.
      // But useWindowSize returns responsiveClass which closes over currentBreakpoint?
      // No, `responsiveClass` is defined inside `useWindowSize`.
      // It reads `currentBreakpoint.value`.
      
      // However, to be reactive in template, it should be a computed or method used in computed.
      // If used as method in template: `class="responsiveClass({ ... })"` it works.
      
      expect(responsiveClass(classes)).toBe('p-8');
      
      width.value = 800; // md range (>=768 <1024)
      // currentBreakpoint becomes 'md'
      expect(responsiveClass(classes)).toBe('p-4');
      
      width.value = 600; // sm range (Wait, sm is 640. So 600 is xs)
      // currentBreakpoint becomes 'xs'
      // xs inherits nothing from sm/md/lg?
      // No, xs is smaller than sm.
      // If no xs class provided, return empty?
      // My logic: check xs in classes. No. Loop ends. Return ''.
      expect(responsiveClass(classes)).toBe('');
      
      width.value = 1300; // xl
      // currentBreakpoint 'xl'
      // Inherits 'lg'
      expect(responsiveClass(classes)).toBe('p-8');
    });
  });
});
