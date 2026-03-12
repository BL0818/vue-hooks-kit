<script setup lang="ts">
import { ref, watch, defineComponent, h } from 'vue'
import { useMemoizedFn, useReactiveRef, useLazyRef } from '@/hooks'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './PerformanceDemo.vue?raw'

const { t } = useLanguage()

// --- useMemoizedFn Demo ---
const count = ref(0)
const childRenderCount = ref(0)

// A memoized function that depends on reactive state but reference is stable
// Note: In Vue, function stability is usually handled by `setup` closure,
// but `useMemoizedFn` ensures that if we pass this function around, it stays stable
// while always accessing the latest `count`.
const handleSubmit = useMemoizedFn(() => {
  console.log('Submitted count:', count.value)
})

// Simulated Child Component
const ChildComp = defineComponent({
  props: ['onSubmit'],
  setup(props) {
    watch(() => props.onSubmit, () => {
      // This should NOT trigger if onSubmit is stable
      console.log('Prop changed')
    })
    
    // Simple render tracking
    return () => {
      childRenderCount.value++
      return h('div', { class: 'text-xs text-neutral-400 mt-2' }, `${t.value.demo.performance.childRender} ${childRenderCount.value}`)
    }
  }
})

// --- useReactiveRef Demo ---
const { state: heavyState, mutate } = useReactiveRef({ 
  data: [] as number[],
  meta: { timestamp: Date.now() }
})

const addItem = () => {
  mutate((s) => {
    s.data.push(Date.now())
    s.meta.timestamp = Date.now()
  })
}

// --- useLazyRef Demo ---
const lazyValue = useLazyRef(() => {
  console.log('Lazy init...')
  return 'Initialized at ' + new Date().toLocaleTimeString()
})

const api = [
  {
    name: 'useMemoizedFn(fn)',
    type: '(fn: T) => T',
    desc: 'Returns a memoized function that maintains a stable reference.'
  },
  {
    name: 'useReactiveRef(initialState)',
    type: '(initialState: T) => { state, mutate }',
    desc: 'Returns a shallow ref and a mutate function for optimized deep updates.'
  },
  {
    name: 'useLazyRef(factory)',
    type: '(factory: () => T) => Ref<T>',
    desc: 'Returns a ref that initializes its value only when accessed.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.performance.description"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card space-y-8">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-rocket text-primary text-2xl" />
        {{ t.demo.performance.title }}
      </h2>
      
      <!-- useMemoizedFn -->
      <div class="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <h3 class="font-medium text-neutral-700 dark:text-neutral-300 mb-2">useMemoizedFn</h3>
        <p class="text-sm text-neutral-500 mb-4">{{ t.demo.performance.memoized }}</p>
        
        <div class="flex items-center gap-4">
          <button class="btn-primary" @click="count++">
            {{ t.demo.performance.clickMe }} ({{ count }})
          </button>
          <ChildComp :onSubmit="handleSubmit" />
        </div>
      </div>

      <!-- useReactiveRef -->
      <div class="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <h3 class="font-medium text-neutral-700 dark:text-neutral-300 mb-2">useReactiveRef</h3>
        <p class="text-sm text-neutral-500 mb-4">{{ t.demo.performance.reactive }}</p>
        
        <div class="flex flex-col gap-2">
          <div class="text-sm font-mono bg-white dark:bg-neutral-900 p-2 rounded border border-neutral-200 dark:border-neutral-700">
            Length: {{ heavyState.data.length }}
          </div>
          <button class="btn-secondary self-start" @click="addItem">
            {{ t.demo.performance.mutate }}
          </button>
        </div>
      </div>

      <!-- useLazyRef -->
      <div class="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <h3 class="font-medium text-neutral-700 dark:text-neutral-300 mb-2">useLazyRef</h3>
        <p class="text-sm text-neutral-500 mb-4">{{ t.demo.performance.lazy }}</p>
        
        <div class="text-sm font-mono text-primary">
          {{ lazyValue }}
        </div>
      </div>
    </section>
  </DemoCard>
</template>
