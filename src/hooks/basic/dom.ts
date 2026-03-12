import { ref, onMounted, onUnmounted, unref, type Ref, watch, isRef, type MaybeRef } from 'vue'
import { useMounted, useUnmount } from './lifecycle'

// --- useEventListener ---

export function useEventListener(
  target: EventTarget | Ref<EventTarget | null> | Window | Document,
  event: string,
  callback: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  const cleanup = () => {
    const el = unref(target)
    if (el) {
      el.removeEventListener(event, callback, options)
    }
  }

  const stop = () => cleanup()

  // 如果 target 是 ref，需要监听变化
  if (isRef(target)) {
    watch(target, (el, prevEl) => {
      if (prevEl) {
        prevEl.removeEventListener(event, callback, options)
      }
      if (el) {
        el.addEventListener(event, callback, options)
      }
    }, { immediate: true })
  } else {
    // 非 ref，直接挂载
    useMounted(() => {
      const el = target as EventTarget
      if (el) {
        el.addEventListener(event, callback, options)
      }
    })
  }

  useUnmount(cleanup)

  return stop
}

// --- useWindowSize ---

export function useBasicWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  useEventListener(window, 'resize', update)

  return { width, height }
}

// --- useElementSize ---

export interface ElementSize {
  width: number
  height: number
}

export function useElementSize(target: Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)

  let observer: ResizeObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  useMounted(() => {
    const el = unref(target)
    if (el) {
      width.value = el.offsetWidth
      height.value = el.offsetHeight

      observer = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (entry) {
          width.value = entry.contentRect.width
          height.value = entry.contentRect.height
        }
      })
      observer.observe(el)
    }
  })

  useUnmount(cleanup)

  return { width, height }
}

// --- useResize ---
// Alias for useElementSize or combined utility?
// User asked for "useResize (listen to element/window size)"
// I will export useWindowSize and useElementSize separately, and maybe a combined useResize if needed.
// But for now, let's stick to specific ones as they are cleaner.
// I'll implement useResize as a wrapper that can handle both if target is provided or not, 
// but useElementSize takes a target. useWindowSize doesn't.
// Let's implement useResize as an alias to useElementSize for now, or just export useElementSize and useWindowSize.
// The user explicitly listed useResize. Let's make it a general purpose hook.

export function useResize(target?: Ref<HTMLElement | null>) {
  if (target) {
    return useElementSize(target)
  } else {
    return useBasicWindowSize()
  }
}

// --- useScroll ---

export function useScroll(target: Ref<HTMLElement | null | undefined> | Window = window) {
  const x = ref(0)
  const y = ref(0)

  const update = () => {
    const el = unref(target as MaybeRef<HTMLElement | Window | null | undefined>)
    if (!el) return
    if ((el as unknown) === window) {
      x.value = window.scrollX
      y.value = window.scrollY
    } else {
      x.value = (el as HTMLElement).scrollLeft
      y.value = (el as HTMLElement).scrollTop
    }
  }

  useEventListener(target as any, 'scroll', update, { passive: true })

  return { x, y }
}

// --- useClickOutside ---

export function useClickOutside(
  target: Ref<HTMLElement | null>,
  handler: (event: MouseEvent) => void
) {
  const listener = (event: MouseEvent) => {
    const el = unref(target)
    if (!el) return

    if (el === event.target || event.composedPath().includes(el)) {
      return
    }

    handler(event)
  }

  useEventListener(window, 'click', listener as EventListener)
}
