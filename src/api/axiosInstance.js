import axios from 'axios'
import { useAuthStore } from '../stores/auth.js'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL de votre backend
  withCredentials: true // Envoie les cookies HTTP-only
})

const getAuthStore = () => useAuthStore()

// Intercepteur de requête pour ajouter l'en-tête Authorization
api.interceptors.request.use(
  (config) => {
    const authStore = getAuthStore()
    const token = authStore.accessToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les erreurs 401 (token expiré ou non authentifié)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Si 401, redirige vers la page de connexion
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
