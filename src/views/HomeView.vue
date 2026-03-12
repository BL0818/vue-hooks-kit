<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] flex flex-col relative lg:overflow-hidden bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
    <!-- Background decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Hero Section -->
      <div class="text-center mb-8 lg:mb-12 xl:mb-16 animate-fade-in-up">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 leading-tight">
          {{ t.hero.titleLine1 }}
          <span class="text-primary block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{{ t.hero.titleLine2 }}</span>
        </h1>
        <p class="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {{ t.hero.description }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/hooks" class="btn-primary flex items-center justify-center gap-2 text-base px-8 py-3 shadow-lg shadow-primary/20">
            {{ t.hero.getStarted }}
            <div class="i-carbon-arrow-right text-lg"></div>
          </router-link>
          <a href="https://github.com" target="_blank" class="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-3">
            <div class="i-carbon-logo-github text-xl"></div>
            {{ t.hero.viewOnGithub }}
          </a>
        </div>
      </div>

      <!-- Features Grid (Compact) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in-up animation-delay-300">
        <div v-for="feature in t.features.items" :key="feature.title" class="app-card mb-0 flex flex-col items-center text-center p-6 hover:-translate-y-1 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50">
          <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-4">
            <div :class="feature.icon"></div>
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

    </main>

    <!-- Footer -->
    <footer class="py-6 text-center text-neutral-400 dark:text-neutral-600 text-sm relative z-10">
      <p>© {{ new Date().getFullYear() }} VueHooksKit. {{ t.footer.text }}</p>
    </footer>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
