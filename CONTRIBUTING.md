# VueHooksKit 贡献指南与开发规范

感谢您对 VueHooksKit 的关注与贡献！为了确保项目的高质量与可维护性，请遵循以下开发规范。

## 1. 开发规范

### 1.1 命名规范

*   **Hook 命名**：必须以 `use` 开头，遵循 CamelCase 命名法，且具有明确语义。
    *   ✅ `useTablePagination` (语义清晰)
    *   ❌ `useTablePage` (语义模糊)
    *   ❌ `useGetList` (避免动词开头，除非是单纯的数据获取)
*   **文件命名**：与 Hook 名称保持一致，例如 `useTablePagination.ts`。
*   **目录命名**：遵循 KebabCase 命名法，例如 `business/user-center`。

### 1.2 目录结构规范

严格遵循以下三层分类，禁止跨目录存放或创建其他顶级目录：

```
src/hooks/
├── basic/      # 基础 Hooks (Vue 原生能力增强，如生命周期、状态、DOM)
│   ├── dom.ts
│   ├── lifecycle.ts
│   └── ...
├── business/   # 业务/通用逻辑 Hooks (UI逻辑、数据请求、权限、路由、Store)
│   ├── ui/
│   ├── data/
│   ├── access/
│   ├── router/
│   └── store/
└── advanced/   # 高级 Hooks (性能优化、异步处理、跨端适配等复杂逻辑)
    ├── async.ts
    ├── performance.ts
    └── ...
```

### 1.3 类型规范 (TypeScript)

*   **严格模式**：项目已启用 strict 模式，禁止使用 `any`，必须定义明确的类型。
*   **接口定义**：优先使用 `interface` 定义 Props 和 Return Type。
*   **JSDoc 注释**：所有导出函数、参数、返回值必须包含 JSDoc 注释，用于生成文档。

```typescript
export interface UseToggleOptions {
  /** 初始状态 */
  initialValue?: boolean;
}

/**
 * 切换布尔值的 Hook
 * @param options 配置项
 */
export function useToggle(options: UseToggleOptions = {}) { ... }
```

### 1.4 副作用清理规范

*   所有事件监听、定时器、订阅等副作用必须在 `onUnmounted` 或 `onScopeDispose` 中清理。
*   参考 `useUnmount` 实现自动清理逻辑。

```typescript
// ✅ 正确示例
const timer = setInterval(() => {}, 1000);
tryOnUnmounted(() => clearInterval(timer));
```

### 1.5 样式规范 (UnoCSS/Tailwind)

*   **禁止硬编码**：禁止在 Hook 内部硬编码 CSS 类名字符串。
*   **样式类返回**：Hook 应返回计算属性或函数，生成动态类名，以便组件灵活使用。
*   **原子化优先**：使用 UnoCSS/Tailwind 原子类，避免编写 CSS 文件。

```typescript
// ✅ 正确示例
const containerClass = computed(() => 'flex items-center justify-center p-4');
return { containerClass };
```

### 1.6 测试规范 (Vitest)

*   **覆盖率要求**：单元测试覆盖率必须 ≥ 90%。
*   **边界测试**：必须覆盖空值、异常输入、边缘情况。
*   **测试文件**：放置在对应目录的 `__tests__` 文件夹下，命名为 `xxx.test.ts`。

## 2. 文档生成方案

本项目使用 **VitePress** + **TypeDoc** 自动生成文档。

### 2.1 文档结构

*   `docs/guide/`：手动编写的使用指南。
*   `docs/api/`：由 TypeDoc 自动生成的 API 文档 (Markdown 格式)。

### 2.2 自动化流程

1.  **解析类型**：TypeDoc 解析 `src/hooks` 下的 TS 类型和注释。
2.  **生成 Markdown**：通过 `typedoc-plugin-markdown` 生成 Markdown 文件至 `docs/api`。
3.  **构建站点**：VitePress 读取 `docs` 目录构建静态站点。

### 2.3 生成命令

```bash
# 生成 API 文档并构建站点
pnpm run docs:build

# 仅生成 API 文档
pnpm run build:docs
```

## 3. 规范落地与保障

### 3.1 代码校验 (ESLint/Prettier)

项目配置了 ESLint 和 Prettier，提交代码前请确保通过校验：

```bash
pnpm run lint
pnpm run format
```

### 3.2 提交钩子 (Husky)

*   **pre-commit**：自动执行 lint-staged，对暂存区文件进行 ESLint 检查和 Prettier 格式化。
*   **commit-msg**：校验 Commit Message 格式 (Conventional Commits)。

### 3.3 发布流程

发布前请执行以下步骤检查文档同步情况：

1.  运行 `pnpm run build:docs` 更新 API 文档。
2.  运行 `pnpm run docs:build` 检查站点构建是否成功。
3.  提交变更。
4.  运行 `pnpm run pub` 发布。

## 4. 贡献流程

1.  Fork 本仓库。
2.  创建特性分支 (`git checkout -b feature/AmazingFeature`)。
3.  提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)。
4.  推送到分支 (`git push origin feature/AmazingFeature`)。
5.  提交 Pull Request。
