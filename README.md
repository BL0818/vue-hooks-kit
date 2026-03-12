# VueHooksKit

A high-reuse, type-safe, atomic-style compatible Vue 3 Hooks collection. Built for modern web development.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue](https://img.shields.io/badge/vue-3.x-green.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- ⚡ **Vue 3 Composition API**: Built from the ground up for Vue 3.
- 📘 **TypeScript Support**: Written in TypeScript with full type definitions.
- 🎨 **Atomic Style Compatible**: Designed to work seamlessly with UnoCSS and Tailwind CSS.
- 🧩 **Rich Collection**: Covers state management, DOM, lifecycle, network, and business logic.
- 📦 **Tree Shakeable**: Import only what you need.

## 📦 Installation

```bash
pnpm add vue-hooks-kit
# or
npm install vue-hooks-kit
# or
yarn add vue-hooks-kit
```

## 🔨 Usage

```typescript
import { useToggle } from 'vue-hooks-kit'

// Basic usage
const [state, { toggle, setLeft, setRight }] = useToggle()

// With custom values
const [status, { toggle: toggleStatus }] = useToggle('active', 'inactive')
```

## 📚 Hooks List

### Basic Hooks

| Hook | Description |
| --- | --- |
| `useToggle` | Boolean switcher with actions. |
| `useCounter` | Manage a counter with min, max, and step support. |
| `useDebounceFn` | Debounce function execution. |
| `useThrottleFn` | Throttle function execution. |
| `useTimeoutFn` | Execute a function after a timeout. |
| `useRAF` | Request Animation Frame hook. |
| `useMounted` | Shorthand for onMounted. |
| `useUnmount` | Shorthand for onUnmounted. |
| `useUpdate` | Force component update. |
| `useLocalStorage` | Reactive LocalStorage. |
| `useSessionStorage` | Reactive SessionStorage. |
| `useDebouncedRef` | Debounced reactive reference. |
| `useThrottledRef` | Throttled reactive reference. |
| `useRequest` | Network request hook with loading/error states. |
| `useEventListener` | Reactive event listener. |
| `useClickOutside` | Detect clicks outside a target element. |
| `useElementSize` | Reactive element size. |
| `useScroll` | Reactive scroll position. |
| `useThemeMode` | Manage light/dark theme modes. |
| `useResponsive` | Responsive breakpoints helper. |

### Advanced Hooks

| Hook | Description |
| --- | --- |
| `useAsync` | Manage async functions with state. |
| `usePromise` | Resolve promises reactively. |
| `useMemoizedFn` | Persist function reference. |
| `useReactiveRef` | Create a reactive reference from a value. |
| `useLazyRef` | Lazily initialize a ref. |
| `useErrorBoundary` | Catch errors in component tree. |
| `useI18n` | Simple internationalization hook. |
| `useHover` | Track element hover state. |
| `useActive` | Track element active state. |
| `useScrollIntoView` | Scroll element into view. |
| `useWindowSize` | Cross-platform window size. |

### Business Hooks

| Hook | Description |
| --- | --- |
| `usePermission` | Manage user permissions. |
| `usePagination` | Pagination logic management. |
| `useTable` | Table state management (data, loading, pagination). |
| `useForm` | Form state and validation. |
| `useFormItem` | Form item binding. |
| `useModal` | Modal visibility and state. |
| `useDrawer` | Drawer visibility and state. |
| `useBreadcrumb` | Breadcrumb navigation helper. |
| `useGlobalState` | Simple global state management. |
| `useRouteGuard` | Router navigation guards. |

## 💻 Development

### Setup

```bash
# Install pnpm if not present
npm install -g pnpm

# Install dependencies
pnpm install
```

### Scripts

- `pnpm dev`: Start the development server (demo page).
- `pnpm build`: Build the library for production.
- `pnpm test`: Run unit tests.
- `pnpm lint`: Lint and fix code style.
- `pnpm docs:dev`: Start documentation server.
- `pnpm pub`: Run full check and publish to npm.

## 📄 License

MIT © 2024-present
