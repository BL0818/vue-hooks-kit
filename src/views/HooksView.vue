<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import CounterDemo from '@/demos/CounterDemo.vue'
import ToggleDemo from '@/demos/ToggleDemo.vue'
import LocalStorageDemo from '@/demos/LocalStorageDemo.vue'
import RequestDemo from '@/demos/RequestDemo.vue'
import ThemeDemo from '@/demos/ThemeDemo.vue'
import DebounceDemo from '@/demos/DebounceDemo.vue'
import WindowSizeDemo from '@/demos/WindowSizeDemo.vue'
import TableDemo from '@/demos/ui/TableDemo.vue'
import FormDemo from '@/demos/ui/FormDemo.vue'
import ModalDemo from '@/demos/ui/ModalDemo.vue'
import PermissionDemo from '@/demos/access/PermissionDemo.vue'
import PerformanceDemo from '@/demos/advanced/PerformanceDemo.vue'
import AsyncDemo from '@/demos/advanced/AsyncDemo.vue'
import HoverDemo from '@/demos/advanced/HoverDemo.vue'
import ScrollDemo from '@/demos/advanced/ScrollDemo.vue'
import ErrorBoundaryDemo from '@/demos/advanced/ErrorBoundaryDemo.vue'
import I18nDemo from '@/demos/advanced/I18nDemo.vue'

const { t } = useLanguage()

const currentHook = ref('useTable')
const searchQuery = ref('')

const hooksList = computed(() => [
  {
    category: t.value.hooks.categories.ui,
    items: [
      { id: 'useTable', name: 'useTable', component: TableDemo },
      { id: 'useForm', name: 'useForm', component: FormDemo },
      { id: 'useModal', name: 'useModal', component: ModalDemo },
    ]
  },
  {
    category: t.value.hooks.categories.access,
    items: [
      { id: 'usePermission', name: 'usePermission', component: PermissionDemo },
    ]
  },
  {
    category: t.value.hooks.categories.performance,
    items: [
      { id: 'useMemoizedFn', name: 'Performance Hooks', component: PerformanceDemo },
    ]
  },
  {
    category: t.value.hooks.categories.async,
    items: [
      { id: 'useAsync', name: 'Async Hooks', component: AsyncDemo },
    ]
  },
  {
    category: t.value.hooks.categories.advancedStyle,
    items: [
      { id: 'useHover', name: 'useHover', component: HoverDemo },
      { id: 'useScrollIntoView', name: 'useScrollIntoView', component: ScrollDemo },
    ]
  },
  {
    category: t.value.hooks.categories.errorI18n,
    items: [
      { id: 'useErrorBoundary', name: 'useErrorBoundary', component: ErrorBoundaryDemo },
      { id: 'useI18n', name: 'useI18n', component: I18nDemo },
    ]
  },
  {
    category: t.value.hooks.categories.state,
    items: [
      { id: 'useCounter', name: 'useCounter', component: CounterDemo },
      { id: 'useToggle', name: 'useToggle', component: ToggleDemo },
      { id: 'useLocalStorage', name: 'useLocalStorage', component: LocalStorageDemo },
    ]
  },
  {
    category: t.value.hooks.categories.network,
    items: [
      { id: 'useRequest', name: 'useRequest', component: RequestDemo },
    ]
  },
  {
    category: t.value.hooks.categories.style,
    items: [
      { id: 'useThemeMode', name: 'useThemeMode', component: ThemeDemo },
    ]
  },
  {
    category: t.value.hooks.categories.utils,
    items: [
      { id: 'useDebounceFn', name: 'useDebounceFn', component: DebounceDemo },
      { id: 'useWindowSize', name: 'useWindowSize', component: WindowSizeDemo },
    ]
  }
])

const filteredHooksList = computed(() => {
  if (!searchQuery.value) return hooksList.value
  
  const query = searchQuery.value.toLowerCase()
  return hooksList.value.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.id.toLowerCase().includes(query)
    )
  })).filter(category => category.items.length > 0)
})

const activeComponent = computed(() => {
  for (const category of hooksList.value) {
    const found = category.items.find(item => item.id === currentHook.value)
    if (found) return found.component
  }
  return CounterDemo
})

const selectHook = (id: string) => {
  currentHook.value = id
}
</script>

<template>
  <div class="flex h-[calc(100vh-64px)] overflow-hidden bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
    <!-- Sidebar -->
    <aside class="w-64 flex-shrink-0 border-r border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md overflow-y-auto hidden md:block transition-colors duration-300 custom-scrollbar">
      <div class="p-4">
        <div class="relative mb-6">
          <input 
            v-model="searchQuery"
            type="text" 
            :placeholder="t.hooks.search" 
            class="w-full box-border pl-10 pr-4 py-2 bg-neutral-100/50 dark:bg-neutral-800/50 border border-transparent focus:bg-white dark:focus:bg-neutral-900 focus:border-primary rounded-xl text-sm outline-none transition-all duration-300 text-neutral-900 dark:text-white placeholder-neutral-400"
          >
          <div class="absolute left-3 top-2.5 text-neutral-400 i-carbon-search text-lg"></div>
        </div>
        
        <div class="space-y-6">
          <div v-for="category in filteredHooksList" :key="category.category">
            <h3 class="px-3 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{{ category.category }}</h3>
            <div class="space-y-1">
              <button 
                v-for="hook in category.items" 
                :key="hook.id"
                @click="selectHook(hook.id)"
                class="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group border-none outline-none focus:outline-none focus:ring-0"
                :class="currentHook === hook.id 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'"
              >
                {{ hook.name }}
                <div v-if="currentHook === hook.id" class="i-carbon-chevron-right text-white"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
      <div class="max-w-4xl mx-auto p-6 lg:p-10">
        <div class="mb-8">
           <h1 class="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{{ currentHook }}</h1>
           <p class="text-neutral-500 dark:text-neutral-400">{{ t.hooks.selectHook }}</p>
        </div>
        <component :is="activeComponent" />
      </div>
    </main>
  </div>
</template>

<style>
/* Custom Scrollbar Styles - Non-scoped to ensure browser compatibility */
.custom-scrollbar {
  /* Firefox support */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.custom-scrollbar:hover {
  /* Firefox support */
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
}

.custom-scrollbar::-webkit-scrollbar-button {
  display: none;
}
</style>
