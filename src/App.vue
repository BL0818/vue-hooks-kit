<script setup lang="ts">
import { useAppTheme } from '@/composables/useAppTheme'
import { useLanguage } from '@/composables/useLanguage'

const { isDark, toggleDark } = useAppTheme()
const { t, toggleLanguage, currentLang } = useLanguage()
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 font-sans text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <router-link to="/" class="flex items-center gap-3 no-underline group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 transition-transform duration-200 group-hover:scale-105">
              <i class="i-carbon-flash text-2xl"></i>
            </div>
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 group-hover:from-primary group-hover:to-secondary transition-all duration-300">{{ t.nav.title }}</span>
          </router-link>
          
          <div class="flex items-center gap-2">
            <router-link to="/hooks" class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-primary transition-all duration-200 no-underline">
              <i class="i-carbon-code text-lg"></i>
              <span>{{ t.nav.hooks }}</span>
            </router-link>

            <router-link to="/more" class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-primary transition-all duration-200 no-underline">
              <i class="i-carbon-list text-lg"></i>
              <span>{{ t.nav.more }}</span>
            </router-link>
            
            <a href="https://github.com/BL0818/vue-hooks-kit" target="_blank" class="w-10 h-10 flex items-center justify-center rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-primary transition-all duration-200 no-underline" title="GitHub">
              <i class="i-carbon-logo-github text-xl"></i>
            </a>

            <div class="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-2 hidden sm:block"></div>
            
            <button class="w-10 h-10 flex items-center justify-center rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-primary transition-all duration-200 border-none outline-none" @click="toggleDark()" title="Toggle Theme">
              <i :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" class="text-xl"></i>
            </button>
            
            <button class="h-10 flex items-center gap-2 px-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-primary transition-all duration-200 border-none outline-none" @click="toggleLanguage()" title="Switch Language">
              <i class="i-carbon-translate text-xl"></i>
              <span class="text-sm font-medium hidden sm:block">{{ currentLang === 'en' ? 'EN' : '中文' }}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style>
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}
</style>
