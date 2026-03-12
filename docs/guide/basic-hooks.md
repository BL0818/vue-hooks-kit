# 基础 Hooks

VueHooksKit 提供了一套完整、通用、高复用的基础 Hooks 集合，涵盖生命周期、状态管理、DOM 操作、网络请求等高频场景。

## 目录

- [生命周期](#生命周期)
  - [useMounted](#usemounted)
  - [useUnmount](#useunmount)
  - [useUpdate](#useupdate)
- [状态管理](#状态管理)
  - [useLocalStorage / useSessionStorage](#uselocalstorage-usesessionstorage)
  - [useCounter](#usecounter)
  - [useToggle](#usetoggle)
  - [useDebouncedRef / useThrottledRef](#usedebouncedref-usethrottledref)
- [DOM 操作](#dom-操作)
  - [useEventListener](#useeventlistener)
  - [useBasicWindowSize](#usebasicwindowsize)
  - [useElementSize](#useelementsize)
  - [useScroll](#usescroll)
  - [useClickOutside](#useclickoutside)
- [网络请求](#网络请求)
  - [useRequest](#userequest)
- [样式适配](#样式适配)
  - [useThemeMode](#usethememode)
  - [useResponsive](#useresponsive)
- [工具类](#工具类)
  - [useDebounceFn / useThrottleFn](#usedebouncefn-usethrottlefn)
  - [useRAF](#useraf)
  - [useTimeoutFn](#usetimeoutfn)

---

## 生命周期

### useMounted
确保回调只在组件挂载时执行一次。
```ts
useMounted(() => {
  console.log('Mounted')
})
```

### useUnmount
确保回调只在组件卸载时执行一次。
```ts
useUnmount(() => {
  console.log('Unmounted')
})
```

### useUpdate
监听组件更新。
```ts
useUpdate(() => {
  console.log('Updated')
})
```

## 状态管理

### useLocalStorage / useSessionStorage
带过期时间和类型校验的存储 Hook。
```ts
const storage = useLocalStorage('key', 'default', { 
  expire: 3600 * 1000 // 1小时过期
})
```

### useCounter
计数器管理。
```ts
const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 })
```

### useToggle
布尔值切换。
```ts
const [state, { toggle, setLeft, setRight }] = useToggle()
```

### useDebouncedRef / useThrottledRef
防抖/节流 Ref。
```ts
const val = useDebouncedRef('initial', 500)
```

## DOM 操作

### useEventListener
自动清理的事件监听。
```ts
useEventListener(window, 'resize', () => {})
useEventListener(refElement, 'click', () => {})
```

### useBasicWindowSize
基础窗口尺寸监听（轻量版）。如需响应式断点支持，请使用高级 Hooks 中的 `useWindowSize`。
```ts
const { width, height } = useBasicWindowSize()
```

### useElementSize
响应式元素尺寸 (ResizeObserver)。
```ts
const el = ref(null)
const { width, height } = useElementSize(el)
```

### useScroll
监听滚动位置。
```ts
const { x, y } = useScroll(window)
```

### useClickOutside
监听点击外部。
```ts
useClickOutside(targetRef, () => {
  console.log('Clicked outside')
})
```

## 网络请求

### useRequest
封装 Axios，支持 Loading、Error、Retry、Cache。
```ts
const { data, loading, run, cancel } = useRequest({
  url: '/api/user',
  method: 'GET'
}, {
  manual: false,
  retryCount: 3,
  cacheKey: 'user-data'
})
```

## 样式适配

### useThemeMode
主题切换，支持 data-theme 或 class 模式。
```ts
const { mode, toggle } = useThemeMode({
  storageKey: 'theme',
  attribute: 'data-theme'
})
```

### useResponsive
响应式断点监听 (sm/md/lg/xl/2xl)。
```ts
const { current, matches } = useResponsive()
// matches.md -> boolean
```

## 工具类

### useDebounceFn / useThrottleFn
函数防抖/节流。
```ts
const run = useDebounceFn(() => {}, 500)
```

### useRAF
Request Animation Frame 循环。
```ts
const { resume, pause } = useRAF((timestamp) => {})
```

### useTimeoutFn
自动清理的定时器。
```ts
const { start, stop } = useTimeoutFn(() => {}, 1000)
```
