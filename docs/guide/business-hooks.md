# 业务 Hooks 指南

本文档介绍了 VueHooksKit 中针对中后台管理系统开发的业务场景 Hooks。这些 Hooks 旨在简化常见的开发任务，如表格、表单、弹窗、权限控制等，并深度集成了 UnoCSS/Tailwind 样式规范。

## 目录

- [表格与分页](#表格与分页)
  - [useTable](#usetable)
  - [usePagination](#usepagination)
- [表单](#表单)
  - [useForm](#useform)
  - [useFormItem](#useformitem)
- [弹窗与抽屉](#弹窗与抽屉)
  - [useModal](#usemodal)
  - [useDrawer](#usedrawer)
- [权限与路由](#权限与路由)
  - [usePermission](#usepermission)
  - [useRouteGuard](#userouteguard)
  - [useBreadcrumb](#usebreadcrumb)
- [全局状态](#全局状态)
  - [useGlobalState](#useglobalstate)

---

## 表格与分页

### useTable

封装了表格的核心逻辑，包括分页、排序、筛选、选中行管理和数据请求。

**使用示例：**

```typescript
import { useTable } from '@/hooks/business/ui'

const { data, loading, pagination, run } = useTable({
  fetchData: async (params) => {
    const res = await api.getUserList(params)
    return { list: res.items, total: res.total }
  },
  defaultParams: { status: 'active' }
})
```

**UnoCSS 适配：**
`useTable` 返回 `classes` 对象，包含常用的表格样式类名（基于 Tailwind/UnoCSS），可直接绑定到元素上。

### usePagination

独立的分页逻辑，支持自定义页码、页大小和总数管理。

**使用示例：**

```typescript
import { usePagination } from '@/hooks/business/data'

const { current, pageSize, total, changeCurrent } = usePagination({
  defaultPageSize: 20
})
```

---

## 表单

### useForm

封装了表单的模型管理、验证、重置和提交逻辑。

**使用示例：**

```typescript
import { useForm } from '@/hooks/business/ui'

const { model, validate, submit, resetFields } = useForm({
  initialModel: { name: '', age: 0 },
  rules: {
    name: { required: true, message: 'Name is required' }
  }
})

const handleSubmit = () => {
  submit(async (values) => {
    await api.createUser(values)
  })
}
```

**UnoCSS 适配：**
`useForm` 返回 `classes` 对象，提供标准的表单布局和控件样式。

### useFormItem

辅助 Hook，用于在自定义组件中获取单个表单项的状态。

---

## 弹窗与抽屉

### useModal & useDrawer

管理弹窗/抽屉的显隐状态、参数传递和样式。

**使用示例：**

```typescript
import { useModal } from '@/hooks/business/ui'

const modal = useModal()

const open = () => modal.open({ id: 1 })
```

**UnoCSS 适配：**
提供 `classes` 对象，包含遮罩层、内容容器、头部、底部等部分的样式类名。

---

## 权限与路由

### usePermission

基于 Pinia `userStore` 的权限检查 Hook。

**使用示例：**

```typescript
import { usePermission } from '@/hooks/business/access'

const { hasPermission, checkPermissionClass } = usePermission()

// 在模板中
// <div v-if="hasPermission('edit')">...</div>
// <div :class="checkPermissionClass('delete')">...</div>
```

### useRouteGuard

全局路由守卫配置 Hook，用于处理登录拦截和权限校验。通常在 `main.ts` 或 `router/index.ts` 中调用。

### useBreadcrumb

自动生成面包屑导航数据，基于路由元信息 (`meta.title`)。

---

## 全局状态

### useGlobalState

轻量级的跨组件状态管理 Hook，适用于简单的全局状态（如主题、侧边栏开关），可作为 Pinia 的替代方案。

**使用示例：**

```typescript
import { useGlobalState } from '@/hooks/business/store'

const { state, toggleTheme } = useGlobalState()
```

## 性能优化说明

1. **防抖/节流**：在 `useTable` 的搜索输入中，建议结合 `useDebounceFn` 使用 `run` 方法。
2. **虚拟滚动**：对于超长列表，建议结合 `@vueuse/core` 的 `useVirtualList`。
3. **缓存**：`useRequest` (内部使用) 支持简单的内存缓存，可配置 `cacheKey`。
4. **按需加载**：Hook 内部引用的工具函数均为按需引入，配合 Vite 的 Tree Shaking 减少打包体积。

## 调试

运行 `pnpm dev` 启动项目，访问演示页面查看实际效果。
