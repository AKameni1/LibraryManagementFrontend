<!-- views/librarian/Dashboard.vue -->
<template>
  <div class="space-y-6">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Active Loans</h3>
        <div class="mt-2 flex items-baseline">
          <p class="text-2xl font-semibold text-gray-900">{{ stats.activeLoans }}</p>
          <p class="ml-2 text-sm text-gray-500">total</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Due Today</h3>
        <div class="mt-2 flex items-baseline">
          <p class="text-2xl font-semibold text-red-600">{{ stats.dueToday }}</p>
          <p class="ml-2 text-sm text-gray-500">books</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Pending Returns</h3>
        <div class="mt-2 flex items-baseline">
          <p class="text-2xl font-semibold text-yellow-600">{{ stats.pendingReturns }}</p>
          <p class="ml-2 text-sm text-gray-500">returns</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Available Books</h3>
        <div class="mt-2 flex items-baseline">
          <p class="text-2xl font-semibold text-green-600">{{ stats.availableBooks }}</p>
          <p class="ml-2 text-sm text-gray-500">books</p>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200 px-6 py-4">
        <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
      </div>
      <ul class="divide-y divide-gray-200">
        <li v-for="activity in recentActivities" :key="activity.id" class="px-6 py-4">
          <div class="flex items-center space-x-4">
            <div :class="getActivityIconClass(activity.type)" class="rounded-full p-2">
              <component :is="getActivityIcon(activity.type)" class="h-5 w-5" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ activity.message }}</p>
              <p class="text-sm text-gray-500">{{ formatDateTime(activity.timestamp) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
            @click="showQuickLoan = true"
            class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Process Loan
        </button>
        <button
            @click="showQuickReturn = true"
            class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Process Return
        </button>
        <button
            @click="generateReport"
            class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Generate Report
        </button>
      </div>
    </div>

    <!-- Modals -->
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import QuickLoanModal from '@/components/book/QuickLoanModal.vue'
import QuickReturnModal from '@/components/book/QuickReturnModal.vue'
import { formatDateTime } from '@/utils/formatters'

const router = useRouter()
const bookStore = useBookStore()
const showQuickLoan = ref(false)
const showQuickReturn = ref(false)

const stats = ref({
  activeLoans: 0,
  dueToday: 0,
  pendingReturns: 0,
  availableBooks: 0
})

const recentActivities = ref([])

onMounted(async () => {
  await fetchDashboardData()
})

const fetchDashboardData = async () => {
  try {
    const [statsData, activities] = await Promise.all([
      bookStore.getDashboardStats(),
      bookStore.getRecentActivities()
    ])
    stats.value = statsData
    recentActivities.value = activities
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
}

const getActivityIconClass = (type) => {
  const classes = {
    loan: 'bg-indigo-100 text-indigo-600',
    return: 'bg-green-100 text-green-600',
    overdue: 'bg-red-100 text-red-600',
    reservation: 'bg-yellow-100 text-yellow-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

const getActivityIcon = (type) => {
  // Return appropriate icon component based on activity type
}

const handleLoanProcessed = async () => {
  showQuickLoan.value = false
  await fetchDashboardData()
}

const handleReturnProcessed = async () => {
  showQuickReturn.value = false
  await fetchDashboardData()
}

const generateReport = () => {
  router.push('/librarian/reports')
}
</script>