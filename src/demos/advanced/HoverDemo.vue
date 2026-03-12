<script setup lang="ts">
import { ref } from 'vue'
import { useHover, useActive } from '@/hooks'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './HoverDemo.vue?raw'

const { t } = useLanguage()

// --- useHover ---
const hoverRef = ref(null)
const { className: hoverClass } = useHover(hoverRef, 'bg-blue-600 shadow-xl scale-110', 'bg-blue-500 shadow-md')

// --- useActive ---
const activeRef = ref(null)
const { className: activeClass } = useActive(activeRef, 'bg-red-600 scale-95', 'bg-red-500 hover:bg-red-500/90')

const api = [
  {
    name: 'useHover(target, hoverClass, normalClass)',
    type: '(target, hoverClass, normalClass) => { isHovered, className }',
    desc: 'Apply class on hover.'
  },
  {
    name: 'useActive(target, activeClass, normalClass)',
    type: '(target, activeClass, normalClass) => { isActive, className }',
    desc: 'Apply class on active (mousedown/touch).'
  },
  {
    name: 'isHovered / isActive',
    type: 'Ref<boolean>',
    desc: 'State of interaction.'
  },
  {
    name: 'className',
    type: 'ComputedRef<string>',
    desc: 'Current class name based on state.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.advancedStyle.hoverDescription"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card space-y-8">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-touch-1 text-primary text-2xl" />
        {{ t.demo.advancedStyle.hoverTitle }}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- useHover -->
        <div class="p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center gap-4">
          <div 
            ref="hoverRef"
            class="w-32 h-32 rounded-2xl flex items-center justify-center text-center text-white font-bold transition-all duration-300 cursor-pointer"
            :class="hoverClass"
          >
            {{ t.demo.advancedStyle.hover }}
          </div>
          <p class="text-xs text-neutral-400 mt-2">Class: {{ hoverClass }}</p>
        </div>

        <!-- useActive -->
        <div class="p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center gap-4">
          <div 
            ref="activeRef"
            class="w-32 h-32 rounded-2xl flex items-center justify-center text-center text-white font-bold transition-all duration-100 cursor-pointer select-none"
            :class="activeClass"
          >
            {{ t.demo.advancedStyle.active }}
          </div>
          <p class="text-xs text-neutral-400 mt-2">Class: {{ activeClass }}</p>
        </div>
      </div>
    </section>
  </DemoCard>
</template>
