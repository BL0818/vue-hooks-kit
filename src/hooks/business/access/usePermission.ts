import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

export function usePermission() {
  const userStore = useUserStore()

  const hasPermission = (permission: string | string[]) => {
    const permissions = Array.isArray(permission) ? permission : [permission]
    return permissions.some(p => userStore.permissions.includes(p))
  }

  const hasRole = (role: string | string[]) => {
    const roles = Array.isArray(role) ? role : [role]
    return roles.some(r => userStore.roles.includes(r))
  }

  // UnoCSS helper: return 'hidden' class if not permitted
  const checkPermissionClass = (permission: string | string[]) => {
    return hasPermission(permission) ? '' : '!hidden'
  }

  const checkRoleClass = (role: string | string[]) => {
    return hasRole(role) ? '' : '!hidden'
  }

  return {
    hasPermission,
    hasRole,
    checkPermissionClass,
    checkRoleClass,
    roles: computed(() => userStore.roles),
    permissions: computed(() => userStore.permissions)
  }
}
