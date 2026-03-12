<script setup lang="ts">
import { usePermission } from '@/hooks/business/access'
import { useUserStore } from '@/stores/user'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './PermissionDemo.vue?raw'

const { t } = useLanguage()
const { hasPermission, checkPermissionClass, roles, permissions } = usePermission()
const userStore = useUserStore()

// Initialize store with some data for demo
if (userStore.roles.length === 0) {
  userStore.setRoles(['user'])
  userStore.setPermissions(['read'])
}

const toggleRole = () => {
  if (userStore.roles.includes('admin')) {
    userStore.setRoles(['user'])
    userStore.setPermissions(['read'])
  } else {
    userStore.setRoles(['admin'])
    userStore.setPermissions(['read', 'write', 'delete'])
  }
}

const api = [
  {
    name: 'hasPermission',
    type: '(permission: string | string[]) => boolean',
    desc: 'Check if user has permission.'
  },
  {
    name: 'hasRole',
    type: '(role: string | string[]) => boolean',
    desc: 'Check if user has role.'
  },
  {
    name: 'checkPermissionClass',
    type: '(permission: string | string[]) => string',
    desc: "Returns 'hidden' class if permission is missing."
  },
  {
    name: 'checkRoleClass',
    type: '(role: string | string[]) => string',
    desc: "Returns 'hidden' class if role is missing."
  },
  {
    name: 'roles',
    type: 'ComputedRef<string[]>',
    desc: 'Current user roles.'
  },
  {
    name: 'permissions',
    type: 'ComputedRef<string[]>',
    desc: 'Current user permissions.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.permission.description"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-security text-primary text-2xl" />
        {{ t.demo.permission.title }}
      </h2>
      
      <div class="mb-8 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400">{{ t.demo.permission.currentRole }}</span>
              <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-mono font-medium">{{ roles }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400">{{ t.demo.permission.currentPerms }}</span>
              <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-mono font-medium">{{ permissions }}</span>
            </div>
          </div>
          
          <button 
            @click="toggleRole" 
            class="btn-primary"
          >
            <div class="i-carbon-user-role mr-2" />
            {{ t.demo.permission.toggle }}
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div class="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 flex items-center gap-3">
          <div class="i-carbon-unlocked text-xl" />
          {{ t.demo.permission.visibleAll }}
        </div>
        
        <div v-if="hasPermission('read')" class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 flex items-center gap-3 animate-fade-in">
          <div class="i-carbon-view text-xl" />
          {{ t.demo.permission.visibleRead }}
        </div>

        <div v-if="hasPermission('write')" class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 text-green-700 dark:text-green-300 flex items-center gap-3 animate-fade-in">
          <div class="i-carbon-edit text-xl" />
          {{ t.demo.permission.visibleWrite }}
        </div>

        <div :class="['p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-3 transition-all', checkPermissionClass('delete')]">
          <div class="i-carbon-trash-can text-xl" />
          {{ t.demo.permission.visibleDelete }}
        </div>
      </div>
    </section>
  </DemoCard>
</template>
