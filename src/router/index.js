import { createRouter, createWebHistory } from 'vue-router'

// Import des vues
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ProductView from '../views/ProductView.vue'
import ContactView from '../views/ContactView.vue'
import FAQView from '../views/FAQView.vue'
import AboutView from '../views/AboutView.vue'
import BlogView from '../views/BlogView.vue'
import LegalView from '../views/LegalView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'LandingPage', component: LandingView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/product', name: 'Product', component: ProductView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/faq', name: 'FAQ', component: FAQView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/blog', name: 'Blog', component: BlogView },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: LegalView },
  { path: '/terms-of-service', name: 'TermsOfService', component: LegalView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
