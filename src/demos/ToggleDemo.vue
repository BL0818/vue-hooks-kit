<script setup lang="ts">
import { useToggle } from '@/hooks/basic/useToggle'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './ToggleDemo.vue?raw'

const [state, { toggle, setLeft, setRight }] = useToggle()
const { t } = useLanguage()

const api = [
  {
    name: 'defaultValue',
    type: 'T',
    default: 'false',
    desc: 'Default value (left side).'
  },
  {
    name: 'reverseValue',
    type: 'U',
    default: '!defaultValue',
    desc: 'Reverse value (right side).'
  },
  {
    name: 'toggle',
    type: '(value?: T | U) => void',
    desc: 'Toggle state or force set value.'
  },
  {
    name: 'setLeft',
    type: '() => void',
    desc: 'Set state to default value.'
  },
  {
    name: 'setRight',
    type: '() => void',
    desc: 'Set state to reverse value.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.toggle.description"
    :api="api"
    :code="demoCode"
  >
    <div class="space-y-4">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-toggle-on text-primary text-2xl" />
        {{ t.demo.toggle.title }}
      </h2>
      
      <div class="flex flex-col items-center justify-center py-8 space-y-8">
        <div 
          class="relative px-8 py-4 rounded-2xl transition-all duration-300"
          :class="state ? 'bg-primary/10' : 'bg-neutral-100 dark:bg-neutral-800'"
        >
          <div class="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-1 uppercase tracking-wider font-bold text-[10px]">Current State</div>
          <div 
            class="text-4xl font-bold font-mono transition-all duration-300"
            :class="state ? 'text-primary scale-110' : 'text-neutral-600 dark:text-neutral-400'"
          >
            {{ String(state).toUpperCase() }}
          </div>
          
          <div class="absolute -top-2 -right-2">
            <div class="relative flex h-4 w-4">
              <span v-if="state" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4" :class="state ? 'bg-primary' : 'bg-neutral-400'"></span>
            </div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-4 justify-center">
          <button 
            class="btn-primary min-w-[120px]" 
            @click="toggle()"
          >
            <div class="i-carbon-arrows-horizontal" />
            {{ t.demo.toggle.toggle }}
          </button>
          
          <div class="h-10 w-px bg-neutral-200 dark:bg-neutral-700 mx-2 hidden md:block" />
          
          <button 
            class="btn-secondary min-w-[100px]" 
            @click="setLeft()"
            :class="{ '!border-primary !text-primary bg-primary/5': !state }"
          >
            {{ t.demo.toggle.setFalse }}
          </button>
          
          <button 
            class="btn-secondary min-w-[100px]" 
            @click="setRight()"
            :class="{ '!border-primary !text-primary bg-primary/5': state }"
          >
            {{ t.demo.toggle.setTrue }}
          </button>
        </div>
      </div>
    </div>
  </DemoCard>
</template>
