<script setup lang="ts">
import { useThemeMode } from '../hooks/basic'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './ThemeDemo.vue?raw'

const { t } = useLanguage()
const { mode, toggle: toggleTheme } = useThemeMode()

const api = [
  {
    name: 'options',
    type: 'UseThemeModeOptions',
    default: '{}',
    desc: 'Configuration for selector, attribute, and storage key.'
  },
  {
    name: 'mode',
    type: 'Ref<ThemeMode>',
    desc: "Current mode ('light' | 'dark' | 'auto')."
  },
  {
    name: 'systemDark',
    type: 'Ref<boolean>',
    desc: 'System dark mode preference.'
  },
  {
    name: 'toggle',
    type: '() => void',
    desc: 'Toggle between light and dark modes.'
  },
  {
    name: 'set',
    type: '(v: ThemeMode) => void',
    desc: 'Set specific mode.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.theme.description"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-color-palette text-primary text-2xl" />
        {{ t.demo.theme.title }}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          class="relative overflow-hidden rounded-xl p-6 border transition-all duration-300 cursor-pointer group"
          :class="mode === 'light' 
            ? 'bg-white border-primary shadow-md ring-2 ring-primary/20' 
            : 'bg-neutral-50 border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-300'"
          @click="mode !== 'light' && toggleTheme()"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center">
                <div class="i-carbon-sun text-xl" />
              </div>
              <span class="font-medium text-lg text-neutral-800">Light Mode</span>
            </div>
            <div v-if="mode === 'light'" class="i-carbon-checkmark-filled text-primary text-xl" />
          </div>
          <div class="space-y-2 opacity-80 pointer-events-none">
            <div class="h-2 w-3/4 bg-neutral-200 rounded" />
            <div class="h-2 w-1/2 bg-neutral-200 rounded" />
          </div>
        </div>

        <div 
          class="relative overflow-hidden rounded-xl p-6 border transition-all duration-300 cursor-pointer group"
          :class="mode === 'dark' 
            ? 'bg-neutral-900 border-primary shadow-md ring-2 ring-primary/20' 
            : 'bg-neutral-800 border-neutral-700 opacity-60 hover:opacity-100 hover:border-neutral-600'"
          @click="mode !== 'dark' && toggleTheme()"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <div class="i-carbon-moon text-xl" />
              </div>
              <span class="font-medium text-lg text-white">Dark Mode</span>
            </div>
            <div v-if="mode === 'dark'" class="i-carbon-checkmark-filled text-primary text-xl" />
          </div>
          <div class="space-y-2 opacity-80 pointer-events-none">
            <div class="h-2 w-3/4 bg-neutral-700 rounded" />
            <div class="h-2 w-1/2 bg-neutral-700 rounded" />
          </div>
        </div>
      </div>
      
      <div class="mt-8 flex justify-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm text-neutral-500 dark:text-neutral-400">
          <span>Current active mode:</span>
          <span class="font-mono font-bold text-primary capitalize">{{ mode }}</span>
        </div>
      </div>
    </section>
  </DemoCard>
</template>
