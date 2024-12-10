<!-- layouts/LibrarianLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg overflow-y-auto">
      <div class="px-4 py-6 border-b">
        <h2 class="text-xl font-semibold text-gray-800">Library Management</h2>
        <p class="text-sm text-gray-500">Librarian Dashboard</p>
      </div>

      <nav class="mt-6 px-4 space-y-2">
        <!-- Navigation Links -->
        <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50"
            :class="{ 'bg-indigo-50 text-indigo-700': isCurrentRoute(item.path) }"
        >
          <component
              :is="item.icon"
              class="h-5 w-5 mr-3"
              :class="{ 'text-indigo-500': isCurrentRoute(item.path) }"
          />
          {{ item.name }}
        </router-link>
      </nav>

      <!-- User Info -->
      <div class="absolute bottom-0 w-full border-t bg-white p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white">
              {{ userInitials }}
            </span>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">{{ user?.Username }}</p>
            <p class="text-xs text-gray-500">Librarian</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="pl-64">
      <!-- Top Bar -->
      <header class="bg-white shadow">
        <div class="flex items-center justify-between px-6 py-4">
          <h1 class="text-2xl font-semibold text-gray-800">{{ currentPageTitle }}</h1>
          <div class="flex items-center space-x-4">
            <!-- Quick Actions -->
            <button
                @click="showQuickLoan = true"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Quick Loan
            </button>
            <button
                @click="showQuickReturn = true"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Process Return
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="py-6 px-6">
        <router-view />
      </main>
    </div>

    <!-- Quick Action Modals -->
    <QuickLoanModal
        v-if="showQuickLoan"
        @close="showQuickLoan = false"
        @loan-processed="handleLoanProcessed"
    />

    <QuickReturnModal
        v-if="showQuickReturn"
        @close="showQuickReturn = false"
        @return-processed="handleReturnProcessed"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import QuickLoanModal from '@/components/book/QuickLoanModal.vue'
import QuickReturnModal from '@/components/book/QuickReturnModal.vue'

const route = useRoute()
const authStore = useAuthStore()
const showQuickLoan = ref(false)
const showQuickReturn = ref(false)

const user = computed(() => authStore.user)
const userInitials = computed(() => {
  if (!user.value?.Username) return ''
  return user.value.Username.split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
})

const navItems = [
  {
    name: 'Dashboard',
    path: '/librarian',
    icon: 'HomeIcon'
  },
  {
    name: 'Book Catalog',
    path: '/librarian/books/catalog',
    icon: 'BookOpenIcon'
  },
  {
    name: 'Active Loans',
    path: '/librarian/loans',
    icon: 'ClipboardListIcon'
  },
  {
    name: 'Reservations',
    path: '/librarian/reservations',
    icon: 'ClockIcon'
  },
  {
    name: 'Reports',
    path: '/librarian/reports',
    icon: 'ChartBarIcon'
  }
]

const currentPageTitle = computed(() => {
  const currentRoute = route.path
  const currentNav = navItems.find(item => currentRoute.includes(item.path))
  return currentNav?.name || 'Dashboard'
})

const isCurrentRoute = (path) => {
  return route.path.startsWith(path)
}

const handleLoanProcessed = () => {
  showQuickLoan.value = false
  // Refresh data if needed
}

const handleReturnProcessed = () => {
  showQuickReturn.value = false
  // Refresh data if needed
}
</script>