<script setup lang="ts">
import { ref } from 'vue'

interface ApiItem {
  name: string
  type: string
  default?: string
  desc: string
}

interface Props {
  description?: string
  api?: ApiItem[]
  code?: string
}

defineProps<Props>()

const showCode = ref(false)
</script>

<template>
  <div class="space-y-8">
    <!-- Description -->
    <p v-if="description" class="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
      {{ description }}
    </p>

    <!-- Interactive Demo -->
    <div class="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm">
      <div class="p-6">
        <slot />
      </div>
      
      <!-- Code Toggle -->
      <div v-if="code" class="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/30 px-4 py-2 flex justify-end">
        <button 
          @click="showCode = !showCode"
          class="text-sm text-neutral-500 hover:text-primary transition-colors flex items-center gap-2"
        >
          <div class="i-carbon-code" />
          {{ showCode ? 'Hide Source' : 'Show Source' }}
        </button>
      </div>

      <!-- Source Code -->
      <div v-if="showCode && code" class="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 overflow-x-auto">
        <pre class="text-sm font-mono text-neutral-700 dark:text-neutral-300 whitespace-pre">{{ code }}</pre>
      </div>
    </div>

    <!-- API Documentation -->
    <div v-if="api && api.length" class="space-y-4">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
        <div class="i-carbon-api text-primary" />
        API
      </h2>
      <div class="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
            <tr>
              <th class="px-6 py-3 font-semibold text-neutral-900 dark:text-neutral-200">Name</th>
              <th class="px-6 py-3 font-semibold text-neutral-900 dark:text-neutral-200">Type</th>
              <th class="px-6 py-3 font-semibold text-neutral-900 dark:text-neutral-200">Default</th>
              <th class="px-6 py-3 font-semibold text-neutral-900 dark:text-neutral-200">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
            <tr v-for="item in api" :key="item.name" class="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
              <td class="px-6 py-4 font-mono text-primary font-medium">{{ item.name }}</td>
              <td class="px-6 py-4 font-mono text-amber-600 dark:text-amber-500 text-xs">{{ item.type }}</td>
              <td class="px-6 py-4 font-mono text-neutral-500 text-xs">{{ item.default || '-' }}</td>
              <td class="px-6 py-4 text-neutral-600 dark:text-neutral-400">{{ item.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
