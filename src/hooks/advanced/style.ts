import { ref, computed, type Ref, unref, watch, onScopeDispose } from 'vue';
import { useElementHover, useEventListener } from '@vueuse/core';

/**
 * useHover - Track element hover state and apply UnoCSS classes
 * 
 * @param target The target element (Ref or HTMLElement)
 * @param hoverClass The class to apply when hovered (e.g. 'bg-blue-500')
 * @param normalClass The class to apply when not hovered (optional)
 * @returns Object containing isHovered state and the current className
 */
export function useHover(
  target: Ref<HTMLElement | null> | HTMLElement,
  hoverClass: string = '',
  normalClass: string = ''
) {
  // Use VueUse's useElementHover for robust event handling
  // Note: useElementHover returns a Ref<boolean>
  const isHovered = useElementHover(target);

  const className = computed(() => {
    return isHovered.value ? hoverClass : normalClass;
  });

  return {
    isHovered,
    className,
  };
}

/**
 * useActive - Track element active state (mousedown/touch)
 * 
 * @param target The target element
 * @param activeClass The class to apply when active
 * @param normalClass The class to apply when inactive
 */
export function useActive(
  target: Ref<HTMLElement | null> | HTMLElement,
  activeClass: string = '',
  normalClass: string = ''
) {
  const isActive = ref(false);
  
  const activate = () => { isActive.value = true; };
  const deactivate = () => { isActive.value = false; };

  // Use useEventListener for automatic cleanup and target handling
  useEventListener(target, 'mousedown', activate);
  useEventListener(target, 'mouseup', deactivate);
  useEventListener(target, 'mouseleave', deactivate);
  useEventListener(target, 'touchstart', activate);
  useEventListener(target, 'touchend', deactivate);
  useEventListener(target, 'touchcancel', deactivate);

  const className = computed(() => {
    return isActive.value ? activeClass : normalClass;
  });

  return {
    isActive,
    className,
  };
}

/**
 * useScrollIntoView - Scroll element into view with smooth behavior
 * 
 * @param target The target element
 * @param options ScrollIntoViewOptions
 */
export function useScrollIntoView(
  target: Ref<HTMLElement | null> | HTMLElement,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
) {
  const scroll = () => {
    const el = unref(target);
    if (el) {
      el.scrollIntoView(options);
    }
  };

  return {
    scroll,
  };
}
