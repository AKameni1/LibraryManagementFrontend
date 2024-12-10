// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

// Auth Views
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import InactiveAccountView from '../views/InactiveAccountView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// Layouts
import AdminLayout from '../layouts/AdminLayout.vue'
import LibrarianLayout from '../layouts/LibrarianLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import UserLayout from '../layouts/UserLayout.vue'

// Admin Views
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import UserManagement from '../views/admin/user/UserManagement.vue'
import UserProfile from '../views/admin/user/UserProfile.vue'
import UserPermissions from '../views/admin/user/UserPermissions.vue'
import UserLoanHistory from '../views/admin/user/UserLoanHistory.vue'
import BookManagement from '../views/admin/book/BookManagement.vue'
import BookCatalog from '../views/admin/book/BookCatalog.vue'
import BookDetails from '../views/admin/book/BookDetails.vue'

// Librarian Views
import LibrarianDashboard from '../views/librarian/LibrarianDashboard.vue'
import BookLoanHistory from '../views/BookLoanHistory.vue'

// User Views
import UserDashboard from '../views/dashboard/UserDashboard.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: { requiresGuest: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordView,
    meta: { requiresGuest: true }
  },
  {
    path: '/inactive',
    name: 'InactiveAccount',
    component: InactiveAccountView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        redirect: to => {
          const authStore = useAuthStore()
          const role = authStore.user?.role

          switch(role) {
            case 'superAdmin':
            case 'admin':
              return '/admin/dashboard'
            case 'librarian':
              return '/librarian/dashboard'
            default:
              return '/user/dashboard'
          }
        }
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, roles: ['admin', 'superAdmin'] },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: AdminDashboard
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'user-management',
            component: UserManagement
          },
          {
            path: ':id',
            name: 'user-profile',
            component: UserProfile
          },
          {
            path: ':id/permissions',
            name: 'user-permissions',
            component: UserPermissions
          },
          {
            path: ':id/loans',
            name: 'user-loan-history',
            component: UserLoanHistory
          }
        ]
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            name: 'book-management',
            component: BookManagement
          },
          {
            path: 'catalog',
            name: 'book-catalog',
            component: BookCatalog
          },
          {
            path: ':id',
            name: 'book-details',
            component: BookDetails
          },
          {
            path: ':id/history',
            name: 'book-loan-history',
            component: BookLoanHistory
          }
        ]
      }
    ]
  },
  {
    path: '/librarian',
    component: LibrarianLayout,
    meta: { requiresAuth: true, roles: ['librarian', 'admin', 'superAdmin'] },
    children: [
      {
        path: '',
        name: 'librarian-dashboard',
        component: LibrarianDashboard
      },
      {
        path: 'books',
        name: 'librarian-books',
        component: BookManagement
      },
      {
        path: 'loans',
        name: 'active-loans',
        component: () => import('../views/librarian/ActiveLoans.vue')
      },
      {
        path: 'reservations',
        name: 'reservations',
        component: () => import('../views/librarian/Reservations.vue')
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'user-dashboard',
        component: UserDashboard
      },
      {
        path: 'loans',
        name: 'my-loans',
        component: () => import('../views/user/MyLoans.vue')
      },
      {
        path: 'history',
        name: 'loan-history',
        component: () => import('../views/user/LoanHistory.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role
  const isActive = authStore.isActive

  // Redirect to login if trying to access protected route while not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // Redirect to dashboard if accessing guest-only routes while authenticated
  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'Dashboard' })
  }

  // Check for required roles
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    return next({ name: 'NotFound' })
  }

  // Redirect inactive users
  if (isAuthenticated && !isActive && to.name !== 'InactiveAccount') {
    return next({ name: 'InactiveAccount' })
  }

  // If none of the above conditions are met, allow navigation
  next()
})

export default router