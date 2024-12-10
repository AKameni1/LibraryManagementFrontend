<!-- layouts/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg overflow-y-auto">
      <div class="px-4 py-6 border-b">
        <h2 class="text-xl font-semibold text-gray-800">Admin Panel</h2>
        <p class="text-sm text-gray-500">{{ currentUser?.role }}</p>
      </div>

      <nav class="mt-6 px-4 space-y-1">
        <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
            isCurrentRoute(item.to)
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          <component
              :is="item.icon"
              class="mr-3 h-5 w-5"
              :class="isCurrentRoute(item.to) ? 'text-indigo-500' : 'text-gray-400'"
          />
          {{ item.name }}
        </router-link>
      </nav>

      <!-- User Info -->
      <div class="absolute bottom-0 w-full border-t bg-white p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span class="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm">
              {{ userInitials }}
            </span>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">{{ currentUser?.username }}</p>
            <button
                @click="handleLogout"
                class="text-xs text-gray-500 hover:text-indigo-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="pl-64">
      <main class="py-6 px-4 sm:px-6 lg:px-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)

const userInitials = computed(() => {
  if (!currentUser.value?.username) return ''
  return currentUser.value.username
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
})

const navigationItems = [
  {
    name: 'Dashboard',
    to: '/admin',
    icon: 'HomeIcon'
  },
  {
    name: 'Users',
    to: '/admin/users',
    icon: 'UsersIcon'
  },
  {
    name: 'Books',
    to: '/admin/books',
    icon: 'BookOpenIcon'
  },
  {
    name: 'Categories',
    to: '/admin/categories',
    icon: 'FolderIcon'
  },
  {
    name: 'Reports',
    to: '/admin/reports',
    icon: 'ChartBarIcon'
  }
]

const isCurrentRoute = (path) => {
  return route.path.startsWith(path)
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>