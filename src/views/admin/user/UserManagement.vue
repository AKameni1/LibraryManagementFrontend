<!-- views/admin/UserManagement.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">User Management</h1>
      <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add User
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <select
              v-model="filters.role"
              class="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value="">All Roles</option>
            <option v-for="role in roles" :key="role.RoleID" :value="role.Name">
              {{ role.Name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select
              v-model="filters.status"
              class="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input
              v-model="filters.search"
              type="text"
              placeholder="Search by name or email..."
              class="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Status</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in filteredUsers" :key="user.UserID">
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                  <span class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    {{ getInitials(user.Username) }}
                  </span>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ user.Username }}</div>
                <div class="text-sm text-gray-500">{{ user.Email }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="getRoleClass(user.Role.Name)">
                {{ user.Role.Name }}
              </span>
          </td>
          <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="user.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ user.IsActive ? 'Active' : 'Inactive' }}
              </span>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-gray-900">{{ user.LoanCount }}/{{ user.LoanLimit }}</div>
            <div class="text-xs text-gray-500">
              {{ user.PenaltyPoints > 0 ? `${user.PenaltyPoints} penalty points` : 'No penalties' }}
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex space-x-3">
              <button
                  @click="editUser(user)"
                  class="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
              <button
                  @click="toggleUserStatus(user)"
                  class="text-gray-600 hover:text-gray-900"
              >
                {{ user.IsActive ? 'Deactivate' : 'Activate' }}
              </button>
              <button
                  @click="viewPermissions(user)"
                  class="text-blue-600 hover:text-blue-900"
              >
                Permissions
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="btn-outline"
          >
            Previous
          </button>
          <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <UserModal
        v-if="showCreateModal || selectedUser"
        :user="selectedUser"
        @close="closeModal"
        @save="saveUser"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/adminStore'
import UserModal from '@/components/user/UserModal.vue'

const router = useRouter()
const adminStore = useAdminStore()

const showCreateModal = ref(false)
const selectedUser = ref(null)
const filters = ref({
  role: '',
  status: '',
  search: ''
})

onMounted(async () => {
  await Promise.all([
    adminStore.fetchUsers(),
    adminStore.fetchRoles()
  ])
})

// Helper functions
const getInitials = (name) => {
  return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
}

const getRoleClass = (role) => {
  const classes = {
    superAdmin: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    librarian: 'bg-green-100 text-green-800',
    client: 'bg-gray-100 text-gray-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

// Actions
const editUser = (user) => {
  selectedUser.value = user
}

const viewPermissions = (user) => {
  router.push(`/admin/users/${user.UserID}/permissions`)
}

const toggleUserStatus = async (user) => {
  try {
    await adminStore.toggleUserActivation(user.UserID, !user.IsActive)
  } catch (error) {
    console.error('Error toggling user status:', error)
  }
}

const closeModal = () => {
  showCreateModal.value = false
  selectedUser.value = null
}

const saveUser = async (userData) => {
  try {
    if (selectedUser.value) {
      await adminStore.updateUser(selectedUser.value.UserID, userData)
    } else {
      await adminStore.createUser(userData)
    }
    closeModal()
    await adminStore.fetchUsers()
  } catch (error) {
    console.error('Error saving user:', error)
  }
}
</script>