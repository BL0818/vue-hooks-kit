# 高级 Hooks 指南

本文档介绍 `src/hooks/advanced` 目录下的一系列高性能、高级场景 Hooks。这些 Hooks 专为复杂业务场景设计，遵循严格的 TypeScript 类型规范和性能优化原则。

## 目录

- [性能优化](#性能优化)
  - [useMemoizedFn](#usememoizedfn)
  - [useReactiveRef](#usereactiveref)
  - [useLazyRef](#uselazyref)
- [异步处理](#异步处理)
  - [useAsync](#useasync)
  - [usePromise](#usepromise)
- [样式交互](#样式交互)
  - [useHover](#usehover)
  - [useActive](#useactive)
  - [useScrollIntoView](#usescrollintoview)
- [错误处理与国际化](#错误处理与国际化)
  - [useErrorBoundary](#useerrorboundary)
  - [useI18n](#usei18n)
- [跨端适配](#跨端适配)
  - [useWindowSize](#usewindowsize)

---

## 性能优化

### useMemoizedFn

创建一个持久化的函数引用，确保函数引用在组件重渲染时保持不变，但始终调用最新的实现。

**使用场景**：传递给 memoized 子组件的回调函数，避免不必要的子组件重渲染。

```typescript
import { useMemoizedFn } from '@/hooks';

const handleSubmit = useMemoizedFn((data) => {
  console.log('Submitted:', data);
});
```

### useReactiveRef

高性能的深层响应式状态。使用 `shallowRef` 内部存储，通过 `mutate` 方法手动触发更新，避免 Vue 默认深层代理的性能开销。

**使用场景**：管理大型数据结构或高频更新的状态。

```typescript
import { useReactiveRef } from '@/hooks';

const { state, mutate } = useReactiveRef({ heavy: { data: [...] } });

mutate((s) => {
  s.heavy.data.push(newItem);
});
```

### useLazyRef

懒加载的 Ref。初始值仅在首次访问 `.value` 时计算。

**使用场景**：初始化开销较大的状态。

```typescript
import { useLazyRef } from '@/hooks';

const heavyState = useLazyRef(() => calculateExpensiveValue());
```

---

## 异步处理

### useAsync

封装异步函数，提供加载状态、错误捕获和取消能力。

```typescript
import { useAsync } from '@/hooks';

const { execute, loading, data, error } = useAsync(fetchData, {
  immediate: true,
  onSuccess: (res) => console.log(res),
});
```

### usePromise

管理 Promise 对象的生命周期。

```typescript
import { usePromise } from '@/hooks';

const { data, loading } = usePromise(() => api.getUser());
```

---

## 样式交互

结合 UnoCSS/Tailwind 原子类，实现样式与逻辑解耦。

### useHover

监听元素悬浮状态，返回响应式类名。

```typescript
import { useHover } from '@/hooks';

const buttonRef = ref(null);
// 悬浮时应用 'bg-blue-600'，平时 'bg-blue-500'
const { className } = useHover(buttonRef, 'bg-blue-600', 'bg-blue-500');
```

### useActive

监听元素激活（按下）状态。

```typescript
const { className } = useActive(buttonRef, 'scale-95', 'scale-100');
```

### useScrollIntoView

平滑滚动到指定元素。

```typescript
const { scroll } = useScrollIntoView(targetRef);
```

---

## 错误处理与国际化

### useErrorBoundary

捕获子组件错误，提供降级处理。

```typescript
const { error, reset } = useErrorBoundary((err) => {
  reportError(err);
});
```

### useI18n

轻量级国际化方案，支持 UnoCSS `rtl` 适配。

```typescript
const { t, setLocale } = useI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': { hello: '你好' },
    'en': { hello: 'Hello' }
  }
});

console.log(t('hello'));
```

---

## 跨端适配

### useWindowSize

响应式窗口尺寸与断点检测，支持 UnoCSS 断点类名生成。

```typescript
const { currentBreakpoint, responsiveClass } = useWindowSize();

// 根据当前断点返回对应的类名
const padding = responsiveClass({
  sm: 'p-4',
  lg: 'p-8',
});
```

## 注意事项

1. **Tree-shaking**: 所有 Hooks 支持按需导入。
2. **UnoCSS 集成**: 样式 Hooks 返回的类名可直接绑定到 `class` 属性。
3. **测试**: 运行 `pnpm test:coverage` 查看测试覆盖率。
