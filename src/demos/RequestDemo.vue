<script setup lang="ts">
import { useRequest } from '../hooks/basic'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './RequestDemo.vue?raw'

const { t } = useLanguage()
const { data, loading, run, error } = useRequest({
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  method: 'GET'
}, {
  manual: true
})

const api = [
  {
    name: 'service',
    type: 'AxiosRequestConfig | ((...args: any[]) => AxiosRequestConfig | Promise<T>)',
    desc: 'The service to execute.'
  },
  {
    name: 'options',
    type: 'UseRequestOptions',
    default: '{}',
    desc: 'Options for the request.'
  },
  {
    name: 'data',
    type: 'Ref<T | undefined>',
    desc: 'The response data.'
  },
  {
    name: 'loading',
    type: 'Ref<boolean>',
    desc: 'The loading state.'
  },
  {
    name: 'error',
    type: 'Ref<unknown | undefined>',
    desc: 'The error object if request fails.'
  },
  {
    name: 'run',
    type: '(...params: any[]) => void',
    desc: 'Manually trigger the request.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.network.description"
    :api="api"
    :code="demoCode"
  >
    <div class="space-y-6">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-http text-primary text-2xl" />
        {{ t.demo.network.title }}
      </h2>
      
      <div class="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div class="flex items-center gap-3">
          <span class="px-2 py-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold">GET</span>
          <code class="text-sm text-neutral-600 dark:text-neutral-400 font-mono">/todos/1</code>
        </div>
        
        <button 
          @click="run()"
          :disabled="loading"
          class="btn-primary min-w-[120px] relative overflow-hidden"
        >
          <span :class="{ 'opacity-0': loading }" class="flex items-center gap-2">
            <div class="i-carbon-send-alt" />
            {{ t.demo.network.fetchData }}
          </span>
          <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
            <div class="i-carbon-circle-dash animate-spin text-xl" />
          </div>
        </button>
      </div>

      <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800 flex items-start gap-3 animate-fade-in">
        <div class="i-carbon-error text-xl mt-0.5" />
        <div>
          <h4 class="font-medium text-sm">{{ t.demo.network.error }}</h4>
          <p class="text-xs mt-1 opacity-80">{{ error }}</p>
        </div>
      </div>

      <div class="relative group">
        <div v-if="!data && !loading && !error" class="h-40 bg-neutral-50 dark:bg-neutral-800/30 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center text-neutral-400 gap-2">
          <div class="i-carbon-cloud-upload text-3xl opacity-50" />
          <span class="text-sm">Ready to fetch data</span>
        </div>

        <pre 
          v-if="data" 
          class="p-4 bg-neutral-900 text-neutral-100 rounded-xl text-xs overflow-auto max-h-60 font-mono shadow-inner border border-neutral-800 custom-scrollbar animate-fade-in"
        >{{ JSON.stringify(data, null, 2) }}</pre>
        
        <div v-if="data" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <div class="text-[10px] text-neutral-500 font-mono px-2 py-1 bg-neutral-800 rounded">JSON</div>
        </div>
      </div>
    </div>
  </DemoCard>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #525252;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #737373;
}
</style>
