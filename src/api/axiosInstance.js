import axios from 'axios'
import { useAuthStore } from '../stores/auth.js'
import { handleApiError } from '../utils/errorHandler.js'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL de votre backend
  withCredentials: true // Envoie les cookies HTTP-only
})

let isRefreshing = false // Indique si un rafraîchissement est en cours
let refreshSubscribers = [] // File d'attente pour les requêtes en attente

// Fonction pour notifier toutes les requêtes en attente après un rafraîchissement
const onRrefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken))
  refreshSubscribers = []
}

// Intercepteur pour ajouter l'en-tête Authorization
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les erreurs 401 et le rafraîchissement des tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()

    if (error.response && error.response.status === 401) {
      const originalRequest = error.config

      // Empêcher une requête déjà retraitée d'être relancée
      if (originalRequest._retry) {
        return Promise.reject(error)
      }
      originalRequest._retry = true

      // Si un rafraîchissement est déjà en cours, attendre sa résolution
      if (isRefreshing) {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(api(originalRequest)) // Relancer la requête une fois le token mis à jour
          })
        })
      }

      // Démarrer le processus de rafraîchissement
      isRefreshing = true

      try {
        await authStore.refreshToken()
        const newToken = authStore.accessToken

        // Notifier les requêtes en attente
        onRrefreshed(newToken)

        // Relancer la requête initiale
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        console.log(handleApiError(refreshError))

        // Déconnecter l'utilisateur et rediriger en cas d'échec
        authStore.logoutUser()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false // Réinitialiser l'état
      }
    }

    // Renvoyer d'autres erreurs
    return Promise.reject(error)
  }
)

export default api
