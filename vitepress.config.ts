import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VueHooksKit',
  description: 'High-reuse, type-safe Vue 3 Hooks collection',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/basic-hooks' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Basic Hooks', link: '/guide/basic-hooks' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo/VueHooksKit' },
    ],
  },
})
