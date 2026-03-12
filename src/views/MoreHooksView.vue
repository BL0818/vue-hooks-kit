<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { computed, ref } from 'vue'
import { hooksUsage } from './hooksUsage'
import { useClipboard } from '@vueuse/core'

const { t } = useLanguage()
const { copy, copied } = useClipboard()

const expandedHook = ref<string | null>(null)

const toggleExpand = (name: string) => {
  if (expandedHook.value === name) {
    expandedHook.value = null
  } else {
    expandedHook.value = name
  }
}

const handleCopy = (text: string) => {
  copy(text)
}

const hooks = computed(() => [
  { name: 'usePagination', category: 'Data', desc: t.value.more.hooks.usePagination, usage: hooksUsage.usePagination },
  { name: 'useClickOutside', category: 'UI', desc: t.value.more.hooks.useClickOutside, usage: hooksUsage.useClickOutside },
  { name: 'useElementSize', category: 'UI', desc: t.value.more.hooks.useElementSize, usage: hooksUsage.useElementSize },
  { name: 'useScroll', category: 'UI', desc: t.value.more.hooks.useScroll, usage: hooksUsage.useScroll },
  { name: 'useEventListener', category: 'UI', desc: t.value.more.hooks.useEventListener, usage: hooksUsage.useEventListener },
  { name: 'useSessionStorage', category: 'State', desc: t.value.more.hooks.useSessionStorage, usage: hooksUsage.useSessionStorage },
  { name: 'useGlobalState', category: 'State', desc: t.value.more.hooks.useGlobalState, usage: hooksUsage.useGlobalState },
  { name: 'useThrottledRef', category: 'State', desc: t.value.more.hooks.useThrottledRef, usage: hooksUsage.useThrottledRef },
  { name: 'useThrottleFn', category: 'Utils', desc: t.value.more.hooks.useThrottleFn, usage: hooksUsage.useThrottleFn },
  { name: 'useTimeoutFn', category: 'Utils', desc: t.value.more.hooks.useTimeoutFn, usage: hooksUsage.useTimeoutFn },
  { name: 'useRAF', category: 'Utils', desc: t.value.more.hooks.useRAF, usage: hooksUsage.useRAF },
  { name: 'useMounted', category: 'Lifecycle', desc: t.value.more.hooks.useMounted, usage: hooksUsage.useMounted },
  { name: 'useUnmount', category: 'Lifecycle', desc: t.value.more.hooks.useUnmount, usage: hooksUsage.useUnmount },
  { name: 'useUpdate', category: 'Lifecycle', desc: t.value.more.hooks.useUpdate, usage: hooksUsage.useUpdate },
  { name: 'useRouteGuard', category: 'Router', desc: t.value.more.hooks.useRouteGuard, usage: hooksUsage.useRouteGuard },
  { name: 'useBreadcrumb', category: 'Router', desc: t.value.more.hooks.useBreadcrumb, usage: hooksUsage.useBreadcrumb },
  { name: 'useResponsive', category: 'UI', desc: t.value.more.hooks.useResponsive, usage: hooksUsage.useResponsive },
])
</script>

<template>
  <div class="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto">
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white mb-4">{{ t.more.title }}</h1>
        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">{{ t.more.description }}</p>
      </div>

      <div class="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="bg-neutral-50 dark:bg-neutral-700/50 border-b border-neutral-200 dark:border-neutral-700">
                <th class="px-6 py-4 font-semibold text-neutral-900 dark:text-white w-1/4">{{ t.more.table.name }}</th>
                <th class="px-6 py-4 font-semibold text-neutral-900 dark:text-white w-1/6">{{ t.more.table.category }}</th>
                <th class="px-6 py-4 font-semibold text-neutral-900 dark:text-white">{{ t.more.table.description }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
              <template v-for="hook in hooks" :key="hook.name">
                <tr 
                  @click="toggleExpand(hook.name)"
                  class="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors"
                >
                  <td class="px-6 py-4 font-mono text-primary font-medium">
                    <div class="flex items-center gap-2">
                      <span :class="expandedHook === hook.name ? 'i-carbon-chevron-down transform rotate-180' : 'i-carbon-chevron-right'" class="text-neutral-400 transition-transform duration-200"></span>
                      {{ hook.name }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-300">
                      {{ hook.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-neutral-600 dark:text-neutral-400">{{ hook.desc }}</td>
                </tr>
                <tr v-if="expandedHook === hook.name" class="bg-neutral-50 dark:bg-neutral-800/50">
                   <td colspan="3" class="px-6 py-4">
                     <div class="relative group">
                       <pre class="p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-x-auto text-sm font-mono text-neutral-700 dark:text-neutral-300 shadow-inner">{{ hook.usage }}</pre>
                       <button 
                        @click.stop="copy(hook.usage)" 
                        class="absolute top-2 right-2 p-1.5 rounded-md text-neutral-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 border-none outline-none focus:outline-none"
                        :title="copied ? 'Copied!' : 'Copy code'"
                      >
                        <span :class="copied ? 'i-carbon-checkmark' : 'i-carbon-copy'" class="block w-4 h-4"></span>
                      </button>
                     </div>
                   </td>
                 </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
