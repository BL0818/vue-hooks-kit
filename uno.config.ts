import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      primary: '#6366f1', // Indigo 500
      secondary: '#8b5cf6', // Violet 500
      neutral: {
        50: '#f9fafb', // 页面背景
        100: '#f3f4f6',
        200: '#e5e7eb', // 边框
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280', // 文本次要色
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937', // 文本主色
        900: '#111827',
      },
    },
    boxShadow: {
      'sm': '0 1px 2px rgba(0,0,0,0.05)',
      'md': '0 4px 6px rgba(0,0,0,0.05)',
    },
    borderRadius: {
      'xl': '1rem', // 16px
    },
  },
  shortcuts: {
    // 布局容器：背景色、文本色、字体、最小高度
    'app-container': 'max-w-7xl mx-auto px-4 py-8 bg-neutral-50 dark:bg-neutral-900 min-h-screen text-neutral-800 dark:text-neutral-200 font-sans',
    
    // 卡片：圆角、阴影、悬浮效果（位移+阴影加深，无缩放）
    'app-card': 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm p-6 mb-6 transition-all duration-200 hover:shadow-md hover:-translate-y-[2px]',
    
    // 主按钮：圆角、阴影、悬浮效果
    'btn-primary': 'bg-primary text-white px-4 py-2 rounded-xl shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:-translate-y-[2px] no-underline border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
    
    // 次要按钮：边框、圆角、悬浮效果
    'btn-secondary': 'bg-white dark:bg-neutral-800 border border-solid border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 px-4 py-2 rounded-xl shadow-sm transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:shadow-md hover:-translate-y-[2px] no-underline cursor-pointer flex items-center justify-center gap-2',
    
    // 输入框：仅底部边框、聚焦变色、无圆角
    'app-input': 'w-full box-border px-3 py-2 bg-transparent border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 outline-none rounded-none transition-all duration-200 focus:border-primary placeholder-neutral-400',
    
    // 链接：主色、无下划线、悬浮透明度
    'app-link': 'text-primary no-underline transition-colors duration-200 hover:text-primary/80 cursor-pointer',
  },
  safelist: [
    'i-carbon-checkmark-filled',
    'i-carbon-code',
    'i-carbon-flash',
    'i-carbon-sun',
    'i-carbon-moon',
    'i-carbon-translate',
    'i-carbon-logo-github',
    'i-carbon-arrow-right',
    '!hidden',
  ],
})
