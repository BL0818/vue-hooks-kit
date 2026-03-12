import { type Router } from 'vue-router'
import { useUserStore } from '@/stores/user'

export interface UseRouteGuardOptions {
  router: Router
  whiteList?: string[]
  loginPath?: string
}

export function useRouteGuard(options: UseRouteGuardOptions) {
  const { router, whiteList = ['/login'], loginPath = '/login' } = options
  
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const token = userStore.token
    
    // Start loading bar if available
    
    if (token) {
      if (to.path === loginPath) {
        next({ path: '/' })
      } else {
        // If user info not fetched, fetch it here
        // if (userStore.roles.length === 0) {
        //   await userStore.getUserInfo()
        // }
        next()
      }
    } else {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next(`${loginPath}?redirect=${encodeURIComponent(to.fullPath)}`)
      }
    }
  })

  router.afterEach(() => {
    // Stop loading bar
  })
}
