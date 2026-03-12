# useWindowSize

响应式的窗口尺寸 Hook，集成了 UnoCSS/Tailwind 断点判断。

## 简介

`useWindowSize` 不仅返回当前窗口的宽高，还提供了基于断点（xs, sm, md, lg, xl, 2xl）的响应式状态判断（如 `isMobile`, `isDesktop`）以及一个便捷的 `responsiveClass` 工具函数，用于在 JS 中处理响应式类名或逻辑。

## 核心特性

- **响应式尺寸**：实时追踪窗口 `width` 和 `height`。
- **断点集成**：内置标准断点系统（UnoCSS/Tailwind 默认配置）。
- **设备判断**：提供 `isMobile`, `isTablet`, `isDesktop` 等快捷计算属性。
- **工具函数**：`responsiveClass` 可根据当前断点返回对应的配置值。

## 代码演示

### 基础用法与设备判断

```vue
<script setup lang="ts">
import { useWindowSize } from 'vue-hooks-kit'

const { width, height, isMobile, isDesktop, currentBreakpoint } = useWindowSize()
</script>

<template>
  <div>
    <p>Size: {{ width }} x {{ height }}</p>
    <p>Breakpoint: {{ currentBreakpoint }}</p>
    
    <div v-if="isMobile" class="mobile-layout">
      这是移动端视图
    </div>
    
    <div v-if="isDesktop" class="desktop-layout">
      这是桌面端视图
    </div>
  </div>
</template>
```

### 使用 responsiveClass

`responsiveClass` 类似于 CSS 的 `@media` 查询，它会返回当前匹配到的最大断点对应的值。

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from 'vue-hooks-kit'

const { responsiveClass } = useWindowSize()

// 根据屏幕宽度动态返回不同的类名
const containerClass = computed(() => responsiveClass({
  'xs': 'p-2 bg-gray-100',  // 默认（< 640px）
  'sm': 'p-4 bg-blue-100',  // >= 640px
  'md': 'p-6 bg-green-100', // >= 768px
  'lg': 'p-8 bg-red-100'    // >= 1024px
}))
</script>

<template>
  <div :class="containerClass">
    Resize the window to see changes!
  </div>
</template>
```

## API

```typescript
const { 
  width, 
  height, 
  currentBreakpoint, 
  isMobile, 
  isTablet, 
  isDesktop, 
  responsiveClass 
} = useWindowSize()
```

### 返回值

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `width` | 窗口宽度 | `Ref<number>` |
| `height` | 窗口高度 | `Ref<number>` |
| `currentBreakpoint` | 当前匹配的断点 ('xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl') | `ComputedRef<string>` |
| `isMobile` | 是否为移动端 (< 768px) | `ComputedRef<boolean>` |
| `isTablet` | 是否为平板 (>= 768px && < 1024px) | `ComputedRef<boolean>` |
| `isDesktop` | 是否为桌面端 (>= 1024px) | `ComputedRef<boolean>` |
| `responsiveClass` | 响应式值获取工具函数 | `(map: Record<Breakpoint, T>) => T` |

### 断点定义

| 断点 | 最小宽度 (px) |
| --- | --- |
| `xs` | 0 |
| `sm` | 640 |
| `md` | 768 |
| `lg` | 1024 |
| `xl` | 1280 |
| `2xl` | 1536 |
