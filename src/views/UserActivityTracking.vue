<!-- views/UserActivityTracking.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">User Activity Log</h2>

          <!-- Filters -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">User</label>
              <select
                  v-model="filters.userId"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All Users</option>
                <option v-for="user in adminStore.users" :key="user.UserID" :value="user.UserID">
                  {{ user.Username }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Action Type</label>
              <select
                  v-model="filters.action"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All Actions</option>
                <option value="login">Login</option>
                <option value="book">Book Operations</option>
                <option value="user">User Operations</option>
                <option value="loan">Loan Operations</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Date Range</label>
              <input
                  type="date"
                  v-model="filters.startDate"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <!-- Activity Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="log in auditLogs" :key="log.AuditID">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(log.CreatedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ log.User?.Username || 'System' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getActionClass(log.Action)"
                    >
                      {{ log.Action }}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ log.Entity }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  <button
                      @click="showDetails(log)"
                      class="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-700">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
            </div>
            <div class="flex gap-2">
              <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                Previous
              </button>
              <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <LogDetailsModal
        v-if="selectedLog"
        :log="selectedLog"
        @close="selectedLog = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import LogDetailsModal from './LogDetailsModal.vue'

const adminStore = useAdminStore()
const auditLogs = ref([])
const selectedLog = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const filters = ref({
  userId: '',
  action: '',
  startDate: ''
})

const fetchLogs = async () => {
  try {
    const response = await adminStore.fetchAuditLogs({
      page: currentPage.value,
      ...filters.value
    })
    auditLogs.value = response.logs
    totalPages.value = response.totalPages
  } catch (error) {
    console.error('Error fetching audit logs:', error)
  }
}

onMounted(() => {
  fetchLogs()
})

watch(filters, () => {
  currentPage.value = 1
  fetchLogs()
}, { deep: true })

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

const getActionClass = (action) => {
  const classes = {
    login: 'bg-green-100 text-green-800',
    logout: 'bg-yellow-100 text-yellow-800',
    create: 'bg-blue-100 text-blue-800',
    update: 'bg-indigo-100 text-indigo-800',
    delete: 'bg-red-100 text-red-800'
  }

  for (const [key, value] of Object.entries(classes)) {
    if (action.toLowerCase().includes(key)) {
      return value
    }
  }
  return 'bg-gray-100 text-gray-800'
}

const showDetails = (log) => {
  selectedLog.value = log
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchLogs()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchLogs()
  }
}
</script>