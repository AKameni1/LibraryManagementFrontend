<!-- views/admin/user/UserPermissions.vue -->
<template>
  <div class="bg-white shadow rounded-lg">
    <!-- User Info Header -->
    <div class="px-6 py-4 border-b">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-medium">Permissions for {{ user?.Username }}</h2>
          <p class="text-sm text-gray-500">Role: {{ user?.Role.Name }}</p>
        </div>
      </div>
    </div>

    <div class="p-6 space-y-6">
      <!-- Role-based Permissions -->
      <div>
        <h3 class="text-lg font-medium mb-4">Role Permissions</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
                v-for="permission in rolePermissions"
                :key="permission.PermissionID"
                class="flex items-start space-x-2"
            >
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-sm font-medium">{{ permission.Name }}</p>
                <p class="text-xs text-gray-500">{{ permission.Description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Permissions -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Additional Permissions</h3>
          <button
              v-if="canManagePermissions"
              @click="showAddPermissionModal = true"
              class="btn-primary"
          >
            Add Permission
          </button>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
                v-for="permission in additionalPermissions"
                :key="permission.PermissionID"
                class="flex items-start justify-between p-2 bg-white rounded-md shadow-sm"
            >
              <div class="flex items-start space-x-2">
                <div>
                  <p class="text-sm font-medium">{{ permission.Name }}</p>
                  <p class="text-xs text-gray-500">{{ permission.Description }}</p>
                </div>
              </div>
              <button
                  v-if="canManagePermissions"
                  @click="revokePermission(permission)"
                  class="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Permission Modal -->
    <div v-if="showAddPermissionModal" class="modal">
      <div class="modal-content">
        <h3 class="text-lg font-medium mb-4">Add Permission</h3>
        <div class="space-y-4">
          <div v-for="perm in availablePermissions" :key="perm.PermissionID">
            <label class="flex items-center space-x-3">
              <input
                  type="checkbox"
                  v-model="selectedPermissions"
                  :value="perm.PermissionID"
                  class="rounded border-gray-300"
              />
              <div>
                <p class="text-sm font-medium">{{ perm.Name }}</p>
                <p class="text-xs text-gray-500">{{ perm.Description }}</p>
              </div>
            </label>
          </div>
        </div>
        <div class="mt-4 flex justify-end space-x-3">
          <button @click="showAddPermissionModal = false" class="btn-outline">
            Cancel
          </button>
          <button @click="addSelectedPermissions" class="btn-primary">
            Add Selected
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/adminStore'

const route = useRoute()
const adminStore = useAdminStore()

const user = ref(null)
const showAddPermissionModal = ref(false)
const selectedPermissions = ref([])

const rolePermissions = computed(() => user.value?.Role.Permissions || [])
const additionalPermissions = computed(() => user.value?.Permissions || [])

const canManagePermissions = computed(() => {
  return adminStore.currentUserRole === 'superAdmin'
})

const availablePermissions = computed(() => {
  const currentPermissionIds = [...rolePermissions.value, ...additionalPermissions.value]
      .map(p => p.PermissionID)
  return adminStore.permissions.filter(p => !currentPermissionIds.includes(p.PermissionID))
})

onMounted(async () => {
  try {
    const userId = route.params.id
    await Promise.all([
      adminStore.fetchPermissions(),
      adminStore.getUserById(userId).then(data => {
        user.value = data
      })
    ])
  } catch (error) {
    console.error('Error fetching user permissions:', error)
  }
})

const addSelectedPermissions = async () => {
  try {
    await adminStore.addPermissionsToUser(user.value.UserID, selectedPermissions.value)
    showAddPermissionModal.value = false
    selectedPermissions.value = []
    // Refresh user data
    const userData = await adminStore.getUserById(user.value.UserID)
    user.value = userData
  } catch (error) {
    console.error('Error adding permissions:', error)
  }
}

const revokePermission = async (permission) => {
  try {
    await adminStore.revokePermissionFromUser(user.value.UserID, permission.PermissionID)
    // Refresh user data
    const userData = await adminStore.getUserById(user.value.UserID)
    user.value = userData
  } catch (error) {
    console.error('Error revoking permission:', error)
  }
}
</script>