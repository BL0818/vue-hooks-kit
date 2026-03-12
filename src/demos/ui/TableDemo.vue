<script setup lang="ts">
import { useTable } from '@/hooks/business/ui'
import { useLanguage } from '@/composables/useLanguage'
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './TableDemo.vue?raw'

const { t } = useLanguage()

const fetchData = async (params: any) => {
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const total = 100
  const start = (params.page - 1) * params.size
  const list = Array.from({ length: params.size }).map((_, i) => ({
    id: start + i + 1,
    name: `User ${start + i + 1}`,
    role: (start + i) % 2 === 0 ? 'Admin' : 'User',
    status: (start + i) % 3 === 0 ? 'Active' : 'Inactive',
    email: `user${start + i + 1}@example.com`
  }))

  return {
    list,
    total
  }
}

const {
  data,
  loading,
  pagination,
  filters,
  sorter,
  run,
  reset,
  handleSort,
  classes
} = useTable({
  fetchData,
  defaultParams: { name: '' },
  pagination: {
    defaultPageSize: 5
  }
})

const columns = computed(() => [
  { title: t.value.demo.table.id, key: 'id', sortable: true },
  { title: t.value.demo.table.name, key: 'name', sortable: true },
  { title: t.value.demo.table.role, key: 'role' },
  { title: t.value.demo.table.email, key: 'email' },
  { title: t.value.demo.table.status, key: 'status' }
])

// Custom Select Logic
const pageSizeOptions = [5, 10, 20]
const isSelectOpen = ref(false)
const selectRef = ref(null)

onClickOutside(selectRef, () => {
  isSelectOpen.value = false
})

const toggleSelect = () => {
  isSelectOpen.value = !isSelectOpen.value
}

const handlePageSizeChange = (size: number) => {
  pagination.changePageSize(size)
  isSelectOpen.value = false
}

const api = [
  {
    name: 'fetchData',
    type: '(params: any) => Promise<TableResponse<T>>',
    desc: 'Async function to fetch data. Should return list and total.'
  },
  {
    name: 'pagination',
    type: 'UsePaginationOptions',
    default: '{}',
    desc: 'Pagination configuration options.'
  },
  {
    name: 'defaultParams',
    type: 'Record<string, any>',
    default: '{}',
    desc: 'Default filter parameters.'
  },
  {
    name: 'manual',
    type: 'boolean',
    default: 'false',
    desc: 'Whether to manually trigger the first request.'
  },
  {
    name: 'rowKey',
    type: 'string | ((record: T) => string)',
    default: "'id'",
    desc: 'Unique key for each row.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.table.description"
    :api="api"
    :code="demoCode"
  >
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-table text-primary text-2xl" />
        {{ t.demo.table.title }}
      </h2>
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Filter Bar -->
          <div class="relative group w-48 max-w-[200px]">
            <input 
              v-model="filters.name" 
              :placeholder="t.demo.table.search" 
              class="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-solid border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              @keyup.enter="run()"
            />
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors i-carbon-search"></div>
          </div>
          
        <div class="flex items-center gap-2 shrink-0">
          <button @click="run()" class="btn-primary px-3 py-2 rounded-xl flex items-center gap-2 text-sm whitespace-nowrap">
            <div class="i-carbon-search" />
            {{ t.demo.table.search }}
          </button>
          
          <button @click="reset" class="btn-secondary px-3 py-2 rounded-xl flex items-center gap-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 whitespace-nowrap">
            <div class="i-carbon-reset" />
          </button>
        </div>
      </div>

      <!-- Table Container -->
      <div class="relative border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm">
        <div v-if="loading" class="absolute inset-0 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div class="animate-spin text-primary text-2xl i-carbon-circle-dash"></div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th v-for="col in columns" :key="col.key" class="px-6 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                  <div class="flex items-center gap-1 cursor-pointer select-none group" @click="col.sortable && handleSort(col.key, sorter.order === 'asc' ? 'desc' : 'asc')">
                    {{ col.title }}
                    <div v-if="col.sortable" class="flex flex-col text-[10px] leading-none text-neutral-400 group-hover:text-primary transition-colors">
                      <span :class="{ 'text-primary': sorter.field === col.key && sorter.order === 'asc' }" class="i-carbon-caret-up -mb-0.5"></span>
                      <span :class="{ 'text-primary': sorter.field === col.key && sorter.order === 'desc' }" class="i-carbon-caret-down"></span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800">
              <tr v-if="data.length === 0" class="h-32">
                <td :colspan="columns.length" class="text-center text-neutral-400">{{ t.demo.table.noData }}</td>
              </tr>
              <tr v-for="row in data" :key="row.id" class="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <td v-for="col in columns" :key="col.key" class="px-6 py-3 text-neutral-700 dark:text-neutral-300">
                  <span 
                    v-if="col.key === 'status'"
                    class="px-2 py-0.5 rounded-full text-xs font-medium border"
                    :class="row.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30' 
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'"
                  >
                    {{ row[col.key] }}
                  </span>
                  <span v-else>{{ row[col.key] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex items-center justify-between">
          <span class="text-xs text-neutral-500">{{ t.demo.table.total }} {{ pagination.total }}</span>
          
          <div class="flex items-center gap-3">
            <!-- Custom Select -->
            <div class="relative" ref="selectRef">
              <button 
                @click="toggleSelect"
                class="flex items-center justify-between gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-3 pr-2 py-1 text-xs hover:border-primary/50 transition-colors min-w-[90px]"
                :class="{ 'border-primary ring-1 ring-primary/20': isSelectOpen }"
              >
                <span>{{ pagination.pageSize.value }} {{ t.demo.table.page }}</span>
                <div class="text-neutral-400 i-carbon-chevron-down text-xs transition-transform duration-200" :class="{ 'rotate-180': isSelectOpen }"></div>
              </button>
              
              <div 
                v-if="isSelectOpen"
                class="absolute bottom-full mb-1 left-0 w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden z-20 py-1"
              >
                <div 
                  v-for="size in pageSizeOptions" 
                  :key="size"
                  @click="handlePageSizeChange(size)"
                  class="px-3 py-1.5 text-xs cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  :class="pagination.pageSize.value === size ? 'text-primary bg-primary/5 font-medium' : 'text-neutral-700 dark:text-neutral-300'"
                >
                  {{ size }} {{ t.demo.table.page }}
                </div>
              </div>
            </div>

            <div class="h-4 w-px bg-neutral-200 dark:bg-neutral-700"></div>

            <div class="flex items-center gap-1">
              <button 
                :disabled="pagination.current.value <= 1"
                @click="pagination.changeCurrent(pagination.current.value - 1)"
                class="p-1 rounded border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-neutral-600 dark:text-neutral-400"
              >
                <div class="i-carbon-chevron-left text-base" />
              </button>
              
              <span class="px-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 min-w-[1.5rem] text-center">
                {{ pagination.current.value }}
              </span>
              
              <button 
                :disabled="pagination.current.value * pagination.pageSize.value >= pagination.total.value"
                @click="pagination.changeCurrent(pagination.current.value + 1)"
                class="p-1 rounded border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-neutral-600 dark:text-neutral-400"
              >
                <div class="i-carbon-chevron-right text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DemoCard>
</template>
