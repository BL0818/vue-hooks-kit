import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HooksView from '../views/HooksView.vue'
import MoreHooksView from '../views/MoreHooksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hooks',
      name: 'hooks',
      component: HooksView
    },
    {
      path: '/more',
      name: 'more',
      component: MoreHooksView
    }
  ]
})

export default router
