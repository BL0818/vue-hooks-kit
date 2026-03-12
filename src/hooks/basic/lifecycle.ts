import { onMounted, onUnmounted, onUpdated, nextTick } from 'vue'

/**
 * 确保回调只在组件挂载时执行一次
 * @param fn 回调函数
 */
export function useMounted(fn: () => void) {
  onMounted(() => {
    fn()
  })
}

/**
 * 确保回调只在组件卸载时执行一次
 * @param fn 回调函数
 */
export function useUnmount(fn: () => void) {
  onUnmounted(() => {
    fn()
  })
}

/**
 * 监听组件更新
 * @param fn 回调函数
 */
export function useUpdate(fn: () => void) {
  onUpdated(() => {
    fn()
  })
}
