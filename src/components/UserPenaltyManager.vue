<!-- components/UserPenaltyManager.vue -->
<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h3 class="text-lg font-medium mb-4">User Status</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Loan Stats -->
      <div class="p-4 bg-gray-50 rounded-lg">
        <h4 class="text-sm font-medium text-gray-700">Loan Status</h4>
        <div class="mt-2">
          <p>Current Loans: {{ user.LoanCount }}/{{ user.LoanLimit }}</p>
          <p>Late Returns: {{ user.LateReturnCount }}</p>
        </div>
      </div>

      <!-- Penalty Points -->
      <div class="p-4 bg-gray-50 rounded-lg">
        <h4 class="text-sm font-medium text-gray-700">Penalty Points</h4>
        <div class="mt-2">
          <p class="text-2xl font-bold" :class="{
            'text-red-600': user.PenaltyPoints > 5,
            'text-yellow-600': user.PenaltyPoints > 0 && user.PenaltyPoints <= 5,
            'text-green-600': user.PenaltyPoints === 0
          }">
            {{ user.PenaltyPoints }}
          </p>
        </div>
      </div>

      <!-- Account Status -->
      <div class="p-4 bg-gray-50 rounded-lg">
        <h4 class="text-sm font-medium text-gray-700">Account Status</h4>
        <div class="mt-2">
          <span class="px-2 py-1 rounded-full text-sm font-medium"
                :class="{
              'bg-red-100 text-red-800': user.LoanSuspendedUntil,
              'bg-green-100 text-green-800': !user.LoanSuspendedUntil
            }"
          >
            {{ user.LoanSuspendedUntil ? 'Suspended' : 'Active' }}
          </span>
          <p v-if="user.LoanSuspendedUntil" class="text-sm text-gray-500 mt-1">
            Until: {{ formatDate(user.LoanSuspendedUntil) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Admin Actions -->
    <div v-if="isAdmin" class="mt-6 border-t pt-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Admin Actions</h4>
      <div class="flex space-x-2">
        <button
            @click="adjustPenaltyPoints(-1)"
            class="btn-outline"
            :disabled="user.PenaltyPoints === 0"
        >
          Reduce Penalty Points
        </button>
        <button
            @click="toggleSuspension"
            class="btn-primary"
        >
          {{ user.LoanSuspendedUntil ? 'Remove Suspension' : 'Suspend Account' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const authStore = useAuthStore()
const isAdmin = computed(() => {
  return ['admin', 'superAdmin'].includes(authStore.user?.role)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const adjustPenaltyPoints = async (amount) => {
  // Implementation for adjusting penalty points
}

const toggleSuspension = async () => {
  // Implementation for toggling account suspension
}
</script>