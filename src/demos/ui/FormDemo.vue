<script setup lang="ts">
import { useForm } from '@/hooks/business/ui'
import { useLanguage } from '@/composables/useLanguage'
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './FormDemo.vue?raw'

const { t } = useLanguage()

const { model, errors, validate, resetFields, submit, loading } = useForm({
  initialModel: {
    username: '',
    email: '',
    role: 'user',
    bio: ''
  },
  rules: {
    username: { required: true, message: 'Username is required' },
    email: [
      { required: true, message: 'Email is required' },
      { pattern: /.+@.+\..+/, message: 'Invalid email' }
    ],
    role: { required: true },
    bio: { max: 100, message: 'Bio is too long' }
  }
})

// Custom Select Logic
const isRoleOpen = ref(false)
const roleSelectRef = ref(null)
const roleOptions = [
  { label: 'User', value: 'user' },
  { label: 'Editor', value: 'editor' },
  { label: 'Admin', value: 'admin' }
]

onClickOutside(roleSelectRef, () => {
  isRoleOpen.value = false
})

const currentRoleLabel = computed(() => {
  const option = roleOptions.find(opt => opt.value === model.role)
  return option ? option.label : model.role
})

const handleSelectRole = (value: string) => {
  model.role = value
  isRoleOpen.value = false
}

const handleSubmit = async (values: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert(t.value.demo.form.success + ': ' + JSON.stringify(values))
}

const api = [
  {
    name: 'initialModel',
    type: 'T',
    default: '{}',
    desc: 'Initial form data.'
  },
  {
    name: 'rules',
    type: 'Rules',
    default: '{}',
    desc: 'Validation rules.'
  },
  {
    name: 'model',
    type: 'T',
    desc: 'Reactive form data.'
  },
  {
    name: 'errors',
    type: 'Record<string, string>',
    desc: 'Validation error messages.'
  },
  {
    name: 'validate',
    type: '() => Promise<boolean>',
    desc: 'Validate all fields.'
  },
  {
    name: 'resetFields',
    type: '() => void',
    desc: 'Reset fields to initial values and clear errors.'
  },
  {
    name: 'submit',
    type: '(fn: (values: T) => Promise<void>) => Promise<void>',
    desc: 'Submit form after validation.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.form.description"
    :api="api"
    :code="demoCode"
  >
    <section class="max-w-lg mx-auto">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-form-dataset text-primary text-2xl" />
        {{ t.demo.form.title }}
      </h2>
      
      <form @submit.prevent="submit(handleSubmit)" class="space-y-6">
        <!-- Username -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
            {{ t.demo.form.username }}
            <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input 
              v-model="model.username" 
              type="text" 
              :placeholder="t.demo.form.username"
              class="w-full box-border pl-4 pr-10 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-solid border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              :class="{ 'border-red-500 focus:ring-red-500/20 focus:border-red-500': errors.username }"
            />
            <div class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 i-carbon-user"></div>
          </div>
          <p v-if="errors.username" class="text-xs text-red-500 mt-1 flex items-center gap-1">
            <span class="i-carbon-warning text-sm"></span>
            {{ errors.username }}
          </p>
        </div>
        
        <!-- Email -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
            {{ t.demo.form.email }}
            <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input 
              v-model="model.email" 
              type="email" 
              :placeholder="t.demo.form.email"
              class="w-full box-border pl-4 pr-10 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-solid border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              :class="{ 'border-red-500 focus:ring-red-500/20 focus:border-red-500': errors.email }"
            />
            <div class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 i-carbon-email"></div>
          </div>
          <p v-if="errors.email" class="text-xs text-red-500 mt-1 flex items-center gap-1">
            <span class="i-carbon-warning text-sm"></span>
            {{ errors.email }}
          </p>
        </div>
        
        <!-- Role -->
        <div class="space-y-2" ref="roleSelectRef">
          <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ t.demo.form.role }}</label>
          <div class="relative">
            <!-- Trigger -->
            <div 
              @click="isRoleOpen = !isRoleOpen"
              class="w-full box-border px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-solid border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer flex justify-between items-center"
              :class="{ 'ring-2 ring-primary/20 border-primary': isRoleOpen }"
            >
              <span :class="model.role ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-400'">
                {{ currentRoleLabel }}
              </span>
              <div 
                class="i-carbon-chevron-down text-neutral-400 transition-transform duration-200"
                :class="{ 'rotate-180': isRoleOpen }"
              ></div>
            </div>
            
            <!-- Options -->
            <div 
              v-if="isRoleOpen"
              class="absolute z-10 top-full left-0 w-full mt-1 bg-white dark:bg-neutral-800 border border-solid border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden py-1"
            >
              <div
                v-for="option in roleOptions"
                :key="option.value"
                @click="handleSelectRole(option.value)"
                class="px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer transition-colors flex justify-between items-center"
                :class="{ 'text-primary bg-primary/5': model.role === option.value, 'text-neutral-800 dark:text-neutral-200': model.role !== option.value }"
              >
                {{ option.label }}
                <div v-if="model.role === option.value" class="i-carbon-checkmark text-primary"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ t.demo.form.bio }}</label>
            <span class="text-xs text-neutral-400">{{ (model.bio || '').length }}/100</span>
          </div>
          <textarea 
            v-model="model.bio" 
            rows="3" 
            :placeholder="t.demo.form.bio"
            class="w-full box-border px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-solid border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
            :class="{ 'border-red-500 focus:ring-red-500/20 focus:border-red-500': errors.bio }"
          ></textarea>
          <p v-if="errors.bio" class="text-xs text-red-500 mt-1 flex items-center gap-1">
            <span class="i-carbon-warning text-sm"></span>
            {{ errors.bio }}
          </p>
        </div>

        <div class="flex gap-4 pt-4">
          <button 
            type="submit" 
            class="btn-primary w-32"
            :disabled="loading"
          >
            <div v-if="loading" class="animate-spin i-carbon-circle-dash text-xl mr-2"></div>
            <div v-else class="i-carbon-send text-xl mr-2"></div>
            {{ loading ? t.demo.form.submitting : t.demo.form.submit }}
          </button>
          <button 
            type="button" 
            @click="resetFields" 
            class="btn-secondary w-32"
          >
            <div class="i-carbon-reset text-xl mr-2"></div>
            {{ t.demo.form.reset }}
          </button>
        </div>
      </form>
    </section>
  </DemoCard>
</template>
