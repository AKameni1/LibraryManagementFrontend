import { defineStore } from 'pinia'
import { login, logout, getProfile, refreshToken } from '../api/auth.js'
import { handleApiError } from '../utils/errorHandler.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isActive: (state) => !!state.user?.active,
    // Vérifie si l'utilisateur a une permission spécifique
    hasPermission: (state) => (permission) => state.user?.permissions?.includes(permission),
    // Vérifie si l'utilisateur a toutes les permissions d'une liste
    hasAllPermissions: (state) => (permissions) =>
      permissions.every((permission) => state.user?.permissions?.includes(permission)),
    // Vérifie si l'utilisateur a au moins une permission d'une liste
    hasAnyPermission: (state) => (permissions) =>
      permissions.some((permission) => state.user?.permissions?.includes(permission))
  },
  actions: {
    async loginUser(credentials) {
      try {
        const { data } = await login(credentials)
        this.user = data.user
        this.accessToken = data.accessToken
      } catch (error) {
        console.log(handleApiError(error))
      }
    },
    async logoutUser() {
      await logout()
      this.user = null
      this.accessToken = null
    },
    async fetchProfile() {
      try {
        const { data } = await getProfile()
        this.user = data.user
      } catch (error) {
        console.log(handleApiError(error))
      }
    },
    async refreshToken() {
      try {
        const { data } = await refreshToken()
        this.accessToken = data.accessToken
      } catch (error) {
        console.log(handleApiError(error))
      }
    }
  }
})
