<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- User Information -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">User Details</h3>
        <div class="flex items-center gap-4">
          <div class="h-16 w-16 rounded-full bg-gray-200">
            <!-- User avatar here -->
          </div>
          <div>
            <h4 class="text-xl font-medium">{{ user?.Username }}</h4>
            <p class="text-gray-500">{{ user?.Email }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-500">Role</label>
            <span class="text-sm">{{ user?.Role.Name }}</span>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-500">Status</label>
            <span
                :class="user?.IsActive ? 'text-green-600' : 'text-red-600'"
                class="text-sm"
            >
              {{ user?.IsActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Loan Statistics -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Loan Statistics</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <label class="block text-sm font-medium text-gray-500">Current Loans</label>
            <span class="text-2xl font-bold">{{ user?.LoanCount }}/{{ user?.LoanLimit }}</span>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <label class="block text-sm font-medium text-gray-500">Penalty Points</label>
            <span class="text-2xl font-bold" :class="{
              'text-red-600': user?.PenaltyPoints > 5,
              'text-yellow-600': user?.PenaltyPoints > 0
            }">
              {{ user?.PenaltyPoints }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <UserPenaltyManager
        v-if="user"
        :user="user"
        class="mt-6"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '../../../stores/adminStore.js'
import UserPenaltyManager from '../../../components/UserPenaltyManager.vue'

const route = useRoute()
const adminStore = useAdminStore()
const user = ref(null)

onMounted(async () => {
  try {
    const response = await adminStore.getUserById(route.params.id)
    user.value = response
  } catch (error) {
    console.error('Error fetching user:', error)
  }
})
</script>