import { defineStore } from 'pinia'
import { login, logout, signup } from '../api/auth.js'
import { handleApiError } from '../utils/errorHandler.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isActive: (state) => !!state.user?.active,
    hasPermission: (state) => (permission) => state.user?.permissions?.includes(permission),
    hasAllPermissions: (state) => (permissions) =>
      permissions.every((permission) => state.user?.permissions?.includes(permission)),
    hasAnyPermission: (state) => (permissions) =>
      permissions.some((permission) => state.user?.permissions?.includes(permission))
  },
  actions: {
    async loginUser(credentials) {
      try {
        const { data } = await login(credentials)
        this.accessToken = data.accessToken
        this.user = data.user
      } catch (error) {
        console.error(handleApiError(error))
      }
    },
    async signupUser(formData) {
      try {
        const { data } = await signup(formData)
        this.accessToken = data.accessToken
        this.user = data.user
      } catch (error) {
        console.error(handleApiError(error))
      }
    },
    async logoutUser() {
      try {
        await logout()
        this.user = null
        this.accessToken = null
      } catch (error) {
        console.error(handleApiError(error))
      }
    }
  },
  persist: true
})
