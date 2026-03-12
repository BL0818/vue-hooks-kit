<script setup lang="ts">
import { useCounter } from '../hooks/basic'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './CounterDemo.vue?raw'

const { t } = useLanguage()
const [count, { inc, dec, reset }] = useCounter(0, { min: 0, max: 10 })

const api = [
  {
    name: 'initialValue',
    type: 'number',
    default: '0',
    desc: 'Initial value of the counter.'
  },
  {
    name: 'options',
    type: 'UseCounterOptions',
    default: '{}',
    desc: 'Options for min and max values.'
  },
  {
    name: 'inc',
    type: '(delta?: number) => void',
    desc: 'Increment the counter.'
  },
  {
    name: 'dec',
    type: '(delta?: number) => void',
    desc: 'Decrement the counter.'
  },
  {
    name: 'set',
    type: '(value: number | ((c: number) => number)) => void',
    desc: 'Set the counter to a specific value.'
  },
  {
    name: 'reset',
    type: '() => void',
    desc: 'Reset the counter to the initial value.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.state.counterDescription"
    :api="api"
    :code="demoCode"
  >
    <div class="space-y-4">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-calculator text-primary text-2xl" />
        {{ t.demo.state.counter }}
      </h2>
      
      <div class="flex flex-col items-center justify-center py-8 space-y-8">
        <div class="relative">
          <span class="text-6xl font-mono font-bold text-primary tabular-nums tracking-wider transition-all duration-300 hover:scale-110 block">
            {{ count }}
          </span>
          <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary/20 rounded-full blur-sm" />
        </div>
        
        <div class="flex items-center gap-4">
          <button 
            @click="dec()" 
            class="btn-secondary w-12 h-12 p-0 rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:border-red-800"
            :title="t.demo.state.dec"
          >
            <div class="i-carbon-subtract text-xl" />
          </button>
          
          <button 
            @click="reset()" 
            class="btn-secondary px-6 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            <div class="i-carbon-reset mr-2" />
            {{ t.demo.state.reset }}
          </button>
          
          <button 
            @click="inc()" 
            class="btn-primary w-12 h-12 p-0 rounded-full shadow-lg shadow-primary/30"
            :title="t.demo.state.inc"
          >
            <div class="i-carbon-add text-xl" />
          </button>
        </div>
      </div>
    </div>
  </DemoCard>
</template>
