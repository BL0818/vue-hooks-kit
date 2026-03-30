import { ref, onMounted, onUnmounted, unref, type Ref, watch, isRef, type MaybeRef } from 'vue'

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
    onMounted(() => {
      const el = target as EventTarget
      if (el) {
        el.addEventListener(event, callback, options)
      }
    })
  }

  onUnmounted(cleanup)

  return stop
}

// --- isClient helper ---

const isClient = typeof window !== 'undefined'

// --- useWindowSize ---

export function useBasicWindowSize() {
  const width = ref(isClient ? window.innerWidth : 0)
  const height = ref(isClient ? window.innerHeight : 0)

  const update = () => {
    if (!isClient) return
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  if (isClient) {
    useEventListener(window, 'resize', update)
  }

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

  onMounted(() => {
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

  onUnmounted(cleanup)

  return { width, height }
}

// --- useResize ---

export function useResize(target?: Ref<HTMLElement | null>): { width: Ref<number>, height: Ref<number> } {
  if (target) {
    return useElementSize(target)
  } else {
    return useBasicWindowSize()
  }
}

// --- useScroll ---

export function useScroll(target: Ref<HTMLElement | null | undefined> | Window = (isClient ? window : undefined as unknown as Window)) {
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

  if (isClient) {
    useEventListener(target as EventTarget, 'scroll', update as EventListener, { passive: true })
  }

  return { x, y }
}

// --- useClickOutside ---

export function useClickOutside(
  target: Ref<HTMLElement | null>,
  handler: (event: MouseEvent) => void
) {
  if (!isClient) return

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
