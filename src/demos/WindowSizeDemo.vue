<script setup lang="ts">
import { useWindowSize } from '@/hooks'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './WindowSizeDemo.vue?raw'

const { t } = useLanguage()
const { width, height } = useWindowSize()

const api = [
  {
    name: 'width',
    type: 'Ref<number>',
    desc: 'Current window width.'
  },
  {
    name: 'height',
    type: 'Ref<number>',
    desc: 'Current window height.'
  },
  {
    name: 'currentBreakpoint',
    type: "ComputedRef<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>",
    desc: 'Current active breakpoint.'
  },
  {
    name: 'isMobile',
    type: 'ComputedRef<boolean>',
    desc: 'True if width < md (768px).'
  },
  {
    name: 'responsiveClass',
    type: '(classes: Record<Breakpoint, string>) => string',
    desc: 'Helper to generate responsive classes.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.utils.windowSizeDescription"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-screen text-primary text-2xl" />
        {{ t.demo.utils.windowSize }}
      </h2>
      
      <div class="grid grid-cols-2 gap-6 max-w-2xl mx-auto py-4">
        <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30 flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 duration-300">
          <div class="i-carbon-arrows-horizontal text-3xl text-blue-500 mb-2" />
          <div class="text-sm font-medium text-blue-800 dark:text-blue-200 uppercase tracking-wider">{{ t.demo.utils.width }}</div>
          <div class="text-4xl font-mono font-bold text-blue-600 dark:text-blue-300 tabular-nums">
            {{ width }}
            <span class="text-sm text-blue-400 font-sans font-normal ml-1">px</span>
          </div>
        </div>
        
        <div class="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/30 flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 duration-300">
          <div class="i-carbon-arrows-vertical text-3xl text-purple-500 mb-2" />
          <div class="text-sm font-medium text-purple-800 dark:text-purple-200 uppercase tracking-wider">{{ t.demo.utils.height }}</div>
          <div class="text-4xl font-mono font-bold text-purple-600 dark:text-purple-300 tabular-nums">
            {{ height }}
            <span class="text-sm text-purple-400 font-sans font-normal ml-1">px</span>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center text-xs text-neutral-400">
        Resize your browser window to see changes
      </div>
    </section>
  </DemoCard>
</template>
