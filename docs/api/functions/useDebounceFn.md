# useDebounceFn

用来处理防抖函数的 Hook。

## 简介

`useDebounceFn` 接收一个函数，返回该函数的防抖版本。在指定的时间间隔内，如果该函数被多次调用，只有最后一次调用会被执行。该 Hook 会在组件卸载时自动清除定时器，无需手动管理。

## 核心特性

- **自动清理**：组件卸载时自动清除未执行的定时器，防止内存泄漏。
- **TypeScript 支持**：完整的类型推导，保持原函数的参数和返回值类型。

## 代码演示

### 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from 'vue-hooks-kit'

const value = ref('')
const debouncedValue = ref('')

// 创建一个防抖函数，延迟 500ms 执行
const updateDebouncedValue = useDebounceFn((newValue: string) => {
  debouncedValue.value = newValue
  console.log('Debounced update:', newValue)
}, 500)

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  value.value = target.value
  updateDebouncedValue(target.value)
}
</script>

<template>
  <div>
    <input :value="value" @input="onInput" placeholder="Type something..." />
    <p>Current Value: {{ value }}</p>
    <p>Debounced Value: {{ debouncedValue }}</p>
  </div>
</template>
```

## API

```typescript
const debouncedFn = useDebounceFn(fn, wait)
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `fn` | 需要防抖执行的函数 | `(...args: any[]) => any` | - |
| `wait` | 防抖等待时间，单位 ms | `number` | `200` |

### 返回值

返回一个新的防抖函数，该函数接受与原函数相同的参数。
