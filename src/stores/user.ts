import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])
  const token = ref<string | null>(localStorage.getItem('token'))

  const setRoles = (newRoles: string[]) => {
    roles.value = newRoles
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearToken = () => {
    token.value = null
    localStorage.removeItem('token')
  }

  const setPermissions = (newPermissions: string[]) => {
    permissions.value = newPermissions
  }

  const hasRole = (role: string) => {
    return roles.value.includes(role)
  }

  const hasPermission = (permission: string) => {
    return permissions.value.includes(permission)
  }

  return {
    roles,
    permissions,
    token,
    setRoles,
    setPermissions,
    setToken,
    clearToken,
    hasRole,
    hasPermission
  }
})
