<script setup lang="ts">
import { useModal, useDrawer } from '@/hooks/business/ui'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './ModalDemo.vue?raw'

const { t } = useLanguage()
const modal = useModal()
const drawer = useDrawer({ position: 'right' })

const openModal = () => modal.open({ id: 123, title: t.value.demo.modal.modalTitle, content: t.value.demo.modal.content })
const openDrawer = () => drawer.open({ id: 456, title: t.value.demo.modal.drawerTitle, user: 'Admin' })

const api = [
  {
    name: 'options',
    type: 'UseModalOptions',
    default: '{}',
    desc: 'Options for default visibility and destroy on close.'
  },
  {
    name: 'visible',
    type: 'Ref<boolean>',
    desc: 'Visibility state of the modal.'
  },
  {
    name: 'params',
    type: 'Ref<T | null>',
    desc: 'Parameters passed to the open method.'
  },
  {
    name: 'open',
    type: '(args?: T) => void',
    desc: 'Open the modal with optional arguments.'
  },
  {
    name: 'close',
    type: '() => void',
    desc: 'Close the modal.'
  },
  {
    name: 'toggle',
    type: '() => void',
    desc: 'Toggle visibility.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.modal.description"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-popup text-primary text-2xl" />
        {{ t.demo.modal.title }}
      </h2>
      
      <div class="flex flex-wrap gap-4 justify-center py-8">
        <button @click="openModal" class="btn-primary">
          <div class="i-carbon-popup mr-2" />
          {{ t.demo.modal.openModal }}
        </button>
        <button @click="openDrawer" class="btn-secondary">
          <div class="i-carbon-side-panel-open mr-2" />
          {{ t.demo.modal.openDrawer }}
        </button>
      </div>

      <!-- Modal -->
      <Teleport to="body">
        <div v-if="modal.visible.value" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div 
            class="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity"
            @click="modal.close"
          ></div>
          
          <!-- Content -->
          <div class="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl transform transition-all animate-fade-in-up overflow-hidden">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{{ modal.params?.title }}</h3>
              <button 
                @click="modal.close" 
                class="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors outline-none focus:outline-none border-none"
              >
                <div class="i-carbon-close text-xl" />
              </button>
            </div>
            
            <!-- Body -->
            <div class="p-6">
              <p class="mb-4 text-neutral-600 dark:text-neutral-400">{{ t.demo.modal.content }}</p>
              <div class="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <div class="mb-1 font-semibold text-neutral-700 dark:text-neutral-300">{{ t.demo.modal.params }}</div>
                {{ modal.params }}
              </div>
            </div>
            
            <!-- Footer -->
            <div class="px-6 py-4 bg-neutral-50 dark:bg-neutral-800/50 flex justify-end gap-3">
              <button @click="modal.close" class="btn-secondary px-4 py-2">
                {{ t.demo.modal.cancel }}
              </button>
              <button @click="modal.close" class="btn-primary px-4 py-2">
                {{ t.demo.modal.confirm }}
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Drawer -->
      <Teleport to="body">
        <div v-if="drawer.visible.value" class="fixed inset-0 z-50 flex justify-end">
          <!-- Backdrop -->
          <div 
            class="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity"
            @click="drawer.close"
          ></div>
          
          <!-- Content -->
          <div class="relative w-full max-w-sm h-full bg-white dark:bg-neutral-900 shadow-2xl transform transition-transform animate-slide-in-right flex flex-col">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{{ drawer.params?.title }}</h3>
              <button 
                @click="drawer.close" 
                class="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors outline-none focus:outline-none border-none"
              >
                <div class="i-carbon-close text-xl" />
              </button>
            </div>
            
            <!-- Body -->
            <div class="flex-1 p-6 overflow-y-auto">
              <p class="mb-6 text-neutral-600 dark:text-neutral-400">{{ t.demo.modal.drawerContent }}</p>
              <div class="space-y-4 mb-6">
                <div v-for="i in 5" :key="i" class="h-16 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse"></div>
              </div>
              <div class="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <div class="mb-1 font-semibold text-neutral-700 dark:text-neutral-300">{{ t.demo.modal.params }}</div>
                {{ drawer.params }}
              </div>
            </div>
            
            <!-- Footer -->
            <div class="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex justify-end gap-3">
              <button @click="drawer.close" class="btn-secondary px-4 py-2">
                {{ t.demo.modal.close }}
              </button>
              <button @click="drawer.close" class="btn-primary px-4 py-2">
                {{ t.demo.modal.save }}
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </section>
  </DemoCard>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.2s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.3s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
