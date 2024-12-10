import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

// Import des vues
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import SignupView from '../views/SignupView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ProductView from '../views/ProductView.vue'
import ContactView from '../views/ContactView.vue'
import FAQView from '../views/FAQView.vue'
import AboutView from '../views/AboutView.vue'
import BlogView from '../views/BlogView.vue'
import LegalView from '../views/LegalView.vue'
import InactiveAccount from '../views/InactiveAccountView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'Getstarted', component: LandingView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/product', name: 'Product', component: ProductView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/faq', name: 'FAQ', component: FAQView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/blog', name: 'Blog', component: BlogView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: LegalView },
  { path: '/terms-of-service', name: 'TermsOfService', component: LegalView },
  {
    path: '/inactive',
    name: 'InactiveAccount',
    component: InactiveAccount,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // Si la route nécessite une authentification et que l'utilisateur n'est pas authentifié
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'Login' } // Redirige vers la page de login
  }

  return true // Permet la navigation vers la route demandée
})

export default router
