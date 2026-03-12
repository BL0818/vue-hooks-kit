<script setup lang="ts">
import { ref } from 'vue'
import { useScrollIntoView } from '@/hooks'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './ScrollDemo.vue?raw'

const { t } = useLanguage()

// --- useScrollIntoView ---
const scrollRef = ref(null)
const { scroll } = useScrollIntoView(scrollRef, { behavior: 'smooth', block: 'center' })

const api = [
  {
    name: 'useScrollIntoView(target, options)',
    type: '(target, options) => { scroll }',
    desc: 'Returns a scroll function.'
  },
  {
    name: 'target',
    type: 'Ref<HTMLElement | null> | HTMLElement',
    desc: 'Target element to scroll into view.'
  },
  {
    name: 'options',
    type: 'ScrollIntoViewOptions',
    default: "{ behavior: 'smooth', block: 'start' }",
    desc: 'Native ScrollIntoView options.'
  },
  {
    name: 'scroll',
    type: '() => void',
    desc: 'Trigger the scroll action.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.advancedStyle.scrollDescription"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card space-y-8">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-move text-primary text-2xl" />
        {{ t.demo.advancedStyle.scrollTitle }}
      </h2>

      <div class="p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium text-neutral-700 dark:text-neutral-300">Demo</h3>
          <button class="btn-secondary text-sm" @click="scroll">
            {{ t.demo.advancedStyle.scrollTo }}
          </button>
        </div>
        
        <div class="h-40 overflow-y-auto bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700 p-4 relative">
          <div class="space-y-4">
            <p v-for="i in 5" :key="i" class="text-neutral-400 text-sm">Scroll content...</p>
            
            <div 
              ref="scrollRef" 
              class="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded border border-yellow-200 dark:border-yellow-700 text-center text-sm font-medium"
            >
              Target Element
            </div>
            
            <p v-for="i in 5" :key="'b'+i" class="text-neutral-400 text-sm">More content...</p>
          </div>
        </div>
      </div>
    </section>
  </DemoCard>
</template>
