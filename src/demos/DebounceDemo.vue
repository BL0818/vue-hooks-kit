<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '../hooks/basic'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './DebounceDemo.vue?raw'

const { t } = useLanguage()
const logs = ref<string[]>([])
const debouncedLog = useDebounceFn(() => {
  logs.value.unshift(t.value.demo.utils.debouncedAction + ' ' + new Date().toLocaleTimeString())
  if (logs.value.length > 5) logs.value.pop()
}, 500)

const clearLogs = () => {
  logs.value = []
}

const api = [
  {
    name: 'fn',
    type: 'T',
    desc: 'The function to debounce.'
  },
  {
    name: 'wait',
    type: 'number',
    default: '200',
    desc: 'The number of milliseconds to delay.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.utils.debounceDescription"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-timer text-primary text-2xl" />
        {{ t.demo.utils.debounce }}
      </h2>
      
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <button 
            @click="debouncedLog"
            class="btn-primary"
          >
            <div class="i-carbon-touch-1 text-lg" />
            {{ t.demo.utils.clickFast }}
          </button>
          
          <button 
            @click="clearLogs"
            class="btn-secondary text-sm px-3"
            v-if="logs.length"
          >
            <div class="i-carbon-clean" />
            {{ t.demo.utils.clear || 'Clear' }}
          </button>
        </div>

        <div class="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 min-h-[160px] border border-neutral-200 dark:border-neutral-800 relative overflow-hidden group">
          <div class="absolute top-2 right-2 text-xs text-neutral-400 font-mono opacity-50">LOGS</div>
          <div v-if="logs.length === 0" class="flex flex-col items-center justify-center h-full text-neutral-400 gap-2 opacity-60">
            <div class="i-carbon-terminal text-3xl" />
            <span class="text-sm">No events yet</span>
          </div>
          <transition-group 
            name="list" 
            tag="ul" 
            class="space-y-2 relative z-10"
          >
            <li 
              v-for="(log, index) in logs" 
              :key="log"
              class="text-sm font-mono flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200/50 dark:border-neutral-700/50 animate-fade-in-up"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span class="text-neutral-600 dark:text-neutral-300 flex-1">{{ log }}</span>
              <span class="text-xs text-neutral-400">#{{ index + 1 }}</span>
            </li>
          </transition-group>
        </div>
      </div>
    </section>
  </DemoCard>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
