<script setup lang="ts">
import { useI18n } from '@/hooks'
import { useLanguage } from '@/composables/useLanguage'
import DemoCard from '@/components/DemoCard.vue'
import demoCode from './I18nDemo.vue?raw'

const { t } = useLanguage()

// --- useI18n ---
const { locale, setLocale, t: i18nT } = useI18n({
  locale: 'en',
  messages: {
    en: {
      hello: 'Hello World',
      welcome: 'Welcome to VueHooksKit',
      nested: {
        value: 'Nested Value'
      }
    },
    zh: {
      hello: '你好世界',
      welcome: '欢迎使用 VueHooksKit',
      nested: {
        value: '嵌套值'
      }
    }
  }
})

const api = [
  {
    name: 'options',
    type: '{ locale: Locale; messages: I18nMessages }',
    default: 'undefined',
    desc: 'Initial configuration options.'
  },
  {
    name: 'locale',
    type: 'Ref<Locale>',
    desc: 'Current active locale.'
  },
  {
    name: 'messages',
    type: 'Ref<I18nMessages>',
    desc: 'Localization messages.'
  },
  {
    name: 'setLocale',
    type: '(l: Locale) => void',
    desc: 'Change the current locale.'
  },
  {
    name: 't',
    type: '(key: string, ...args: any[]) => string',
    desc: 'Translate function.'
  }
]
</script>

<template>
  <DemoCard
    :description="t.demo.errorI18n.i18nDescription"
    :api="api"
    :code="demoCode"
  >
    <section class="app-card space-y-8">
      <h2 class="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
        <div class="i-carbon-translate text-primary text-2xl" />
        useI18n (Lightweight)
      </h2>
      
      <div class="p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center min-h-[240px]">
        <!-- Greeting -->
        <div class="text-center mb-8">
          <h3 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-3 transition-all duration-300">
            {{ i18nT('hello') }}
          </h3>
          <p class="text-neutral-500 dark:text-neutral-400 transition-all duration-300">
            {{ i18nT('welcome') }}
          </p>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-1 bg-white dark:bg-neutral-900 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <button 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="locale === 'en' ? 'bg-primary text-white shadow-sm' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'"
            @click="setLocale('en')"
          >
            English
          </button>
          <button 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="locale === 'zh' ? 'bg-primary text-white shadow-sm' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'"
            @click="setLocale('zh')"
          >
            中文
          </button>
        </div>
        
        <!-- Current Locale Indicator -->
        <div class="mt-6 flex items-center gap-2 text-xs text-neutral-400">
          <div class="i-carbon-information text-sm"></div>
          <span>{{ t.demo.errorI18n.currentLang }} <span class="font-mono font-bold text-primary uppercase">{{ locale }}</span></span>
        </div>
      </div>
    </section>
  </DemoCard>
</template>
