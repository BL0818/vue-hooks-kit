<script setup lang="ts">
import { useAsync, usePromise } from '@/hooks'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './AsyncDemo.vue?raw'

const { t } = useLanguage()

// --- useAsync Demo ---
const fetchData = async () => {
  await new Promise(r => setTimeout(r, 1500))
  if (Math.random() > 0.7) throw new Error('Simulated Network Error')
  return { id: 1, name: 'VueHooksKit User', role: 'Developer' }
}

const { execute, loading, data, error, cancel } = useAsync(fetchData, {
  immediate: false,
})

// --- usePromise Demo ---
// A promise that auto-executes
const { data: promiseData, loading: promiseLoading } = usePromise(() => 
  new Promise<string>(r => setTimeout(() => r('Resolved Data'), 1000))
)

const api = [
  {
    name: 'useAsync(fn, options)',
    type: '(fn, options) => AsyncReturn<T>',
    desc: 'Execute async function with loading/error state.'
  },
  {
    name: 'usePromise(factory)',
    type: '(factory) => AsyncReturn<T>',
    desc: 'Auto-execute a promise factory.'
  },
  {
    name: 'loading',
    type: 'Ref<boolean>',
    desc: 'Loading state.'
  },
  {
    name: 'data',
    type: 'ShallowRef<T | null>',
    desc: 'Resolved data.'
  },
  {
    name: 'error',
    type: 'ShallowRef<any | null>',
    desc: 'Error object.'
  },
  {
    name: 'execute',
    type: '(...args) => Promise<T | null>',
    desc: 'Manually trigger execution.'
  },
  {
    name: 'cancel',
    type: '() => void',
    desc: 'Cancel the ongoing operation.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.async.description"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card space-y-8">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-cloud-service-management text-primary text-2xl" />
        {{ t.demo.async.title }}
      </h2>
      
      <!-- useAsync -->
      <div class="p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <h3 class="font-medium text-neutral-700 dark:text-neutral-300 mb-4">useAsync</h3>
        
        <div class="flex gap-4 mb-6">
          <button class="btn-primary" @click="execute" :disabled="loading">
            <div v-if="loading" class="i-carbon-circle-dash animate-spin mr-2" />
            {{ t.demo.async.execute }}
          </button>
          <button class="btn-secondary" @click="cancel" :disabled="!loading">
            {{ t.demo.async.cancel }}
          </button>
        </div>
        
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-neutral-500 w-20">{{ t.demo.async.status }}</span>
            <span :class="{
              'text-yellow-500': loading,
              'text-green-500': data && !loading,
              'text-red-500': error
            }">
              {{ loading ? 'Loading...' : (error ? 'Error' : (data ? 'Success' : 'Idle')) }}
            </span>
          </div>
          
          <div v-if="data" class="bg-white dark:bg-neutral-900 p-3 rounded border border-neutral-200 dark:border-neutral-700 font-mono text-xs">
            {{ JSON.stringify(data, null, 2) }}
          </div>
          
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs">
            {{ error.message }}
          </div>
        </div>
      </div>

      <!-- usePromise -->
      <div class="p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <h3 class="font-medium text-neutral-700 dark:text-neutral-300 mb-4">usePromise (Auto)</h3>
        <div class="text-sm">
          <div v-if="promiseLoading" class="text-neutral-400">Loading promise...</div>
          <div v-else class="text-green-600 font-mono">{{ promiseData }}</div>
        </div>
      </div>
    </section>
  </DemoCard>
</template>
