export const hooksUsage: Record<string, string> = {
  usePagination: `const { currentPage, pageSize, total, totalPages, next, prev } = usePagination({
  total: 100,
  pageSize: 10
})

// update page
next()
console.log(currentPage.value) // 2`,

  useClickOutside: `const target = ref(null)

useClickOutside(target, () => {
  console.log('Clicked outside!')
})

// template: <div ref="target">...</div>`,

  useElementSize: `const el = ref(null)
const { width, height } = useElementSize(el)

// template: <div ref="el">Size: {{ width }} x {{ height }}</div>`,

  useScroll: `const { x, y } = useScroll(window)

console.log(y.value) // Current scroll Y position`,

  useEventListener: `useEventListener(window, 'resize', () => {
  console.log('Window resized')
})`,

  useSessionStorage: `const state = useSessionStorage('my-key', { foo: 'bar' })

// updates sessionStorage automatically
state.value.foo = 'baz'`,

  useThrottledRef: `const input = ref('')
const throttled = useThrottledRef(input, 1000)

// throttled.value updates at most once every 1s`,

  useGlobalState: `const useSharedState = createGlobalState(() => {
  const count = ref(0)
  return { count }
})

const { count } = useSharedState()`,

  useMounted: `useMounted(() => {
  console.log('Component is mounted!')
})`,

  useUnmount: `useUnmount(() => {
  console.log('Component is unmounting...')
})`,

  useUpdate: `const update = useUpdate()

// force re-render
update()`,

  useThrottleFn: `const fn = useThrottleFn(() => {
  console.log('Executed!')
}, 1000)

// call multiple times, executes once per 1s
fn()
fn()`,

  useTimeoutFn: `const { start, stop } = useTimeoutFn(() => {
  console.log('Timeout!')
}, 3000)

// start() to restart, stop() to cancel`,

  useRAF: `const { pause, resume } = useRAF((timestamp) => {
  console.log('Animation frame:', timestamp)
})`,

  useRouteGuard: `useRouteGuard((to, from, next) => {
  if (!auth) next('/login')
  else next()
})`,

  useBreadcrumb: `const { items, setBreadcrumb } = useBreadcrumb()

setBreadcrumb([
  { text: 'Home', to: '/' },
  { text: 'Users', to: '/users' }
])`,

  useResponsive: `const { isMobile, isTablet, isDesktop } = useResponsive()

if (isMobile.value) {
  // Mobile layout
}`
}
