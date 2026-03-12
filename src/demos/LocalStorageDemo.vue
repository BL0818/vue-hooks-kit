<script setup lang="ts">
import { useLocalStorage } from '../hooks/basic'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './LocalStorageDemo.vue?raw'

const { t } = useLanguage()
const storageVal = useLocalStorage('demo-storage', 'Hello World')

const api = [
  {
    name: 'key',
    type: 'string',
    desc: 'The key to store in LocalStorage.'
  },
  {
    name: 'defaultValue',
    type: 'T',
    desc: 'The initial value if the key does not exist.'
  },
  {
    name: 'options',
    type: 'StorageOptions<T>',
    default: '{}',
    desc: 'Options for serialization and expiration.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.state.storageDescription"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-data-base text-primary text-2xl" />
        {{ t.demo.state.storage }}
      </h2>
      
      <div class="space-y-6">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <div class="i-carbon-edit text-lg" />
          </div>
          <input 
            v-model="storageVal"
            class="app-input box-border pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-transparent focus:bg-white dark:focus:bg-neutral-900 transition-all duration-300 w-full outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-neutral-400 text-neutral-800 dark:text-neutral-200"
            :placeholder="t.demo.state.storagePlaceholder"
          />
          <div class="absolute right-3 top-3 text-xs text-neutral-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            Key: demo-storage
          </div>
        </div>

        <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30 flex items-start gap-3">
          <div class="i-carbon-warning-alt text-amber-500 text-xl mt-0.5 flex-shrink-0" />
          <div class="space-y-1">
            <p class="text-sm font-medium text-amber-800 dark:text-amber-200">
              {{ t.demo.state.storagePersist }}
            </p>
            <p class="text-xs text-amber-600 dark:text-amber-400/80 font-mono break-all">
              Current Value: <span class="font-bold text-amber-700 dark:text-amber-100">{{ storageVal }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </DemoCard>
</template>
