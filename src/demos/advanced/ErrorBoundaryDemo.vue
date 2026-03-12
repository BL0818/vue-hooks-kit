<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'
import { useErrorBoundary } from '@/hooks'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './ErrorBoundaryDemo.vue?raw'

const { t } = useLanguage()

// --- useErrorBoundary ---
const error = ref<Error | null>(null)
const reset = () => { error.value = null }
const triggerError = () => { throw new Error('Simulated Component Error') }

const ErrorProneComponent = defineComponent({
  setup() {
    return () => h('div', { class: 'text-center p-4' }, [
      h('button', { 
        class: 'btn-secondary text-red-600 border-red-200 hover:bg-red-50',
        onClick: triggerError 
      }, t.value.demo.errorI18n.throw)
    ])
  }
})

// Wrap with error boundary
const SafeComponent = defineComponent({
  setup() {
    const { error: hookError, reset: hookReset } = useErrorBoundary((err) => {
      console.error('Caught by hook:', err)
    })
    
    return () => hookError.value 
      ? h('div', { class: 'p-4 bg-red-50 border border-red-200 rounded text-red-600 flex flex-col items-center gap-2' }, [
          h('div', { class: 'i-carbon-warning-filled text-2xl' }),
          h('p', hookError.value.message),
          h('button', { class: 'btn-secondary text-red-600 border-red-200 hover:bg-red-50', onClick: hookReset }, t.value.demo.errorI18n.reset)
        ])
      : h(ErrorProneComponent)
  }
})

const api = [
  {
    name: 'callback',
    type: '(err: Error, instance: any, info: string) => void',
    desc: 'Optional callback when an error is captured.'
  },
  {
    name: 'error',
    type: 'ShallowRef<Error | null>',
    desc: 'The captured error object.'
  },
  {
    name: 'reset',
    type: '() => void',
    desc: 'Reset the error state to null.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.errorI18n.errorDescription"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card space-y-8">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-warning-alt text-primary text-2xl" />
        useErrorBoundary
      </h2>
      
      <div class="p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <h3 class="font-medium text-neutral-700 dark:text-neutral-300 mb-4">Error Boundary Demo</h3>
        <SafeComponent />
      </div>
    </section>
  </DemoCard>
</template>
