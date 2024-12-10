<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Total Users"
        :value="stats.totalUsers"
        trend="+12%"
        icon="UsersIcon"
      />
      <StatCard 
        title="Active Loans"
        :value="stats.activeLoans"
        trend="+5%"
        icon="BookOpenIcon"
      />
      <StatCard 
        title="Overdue Books"
        :value="stats.overdueBooks"
        trend="-2%"
        icon="ExclamationCircleIcon"
        trendColor="red"
      />
      <StatCard 
        title="Revenue"
        :value="formatCurrency(stats.revenue)"
        trend="+8%"
        icon="CurrencyDollarIcon"
      />
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <QuickAction
        v-for="action in quickActions"
        :key="action.name"
        v-bind="action"
        @click="handleQuickAction(action.id)"
      />
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b">
        <h3 class="text-lg font-medium">Recent Activity</h3>
      </div>
      <div class="p-4">
        <ActivityList :activities="recentActivities" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import StatCard from '@/components/dashboard/StatCard.vue'
import QuickAction from '@/components/dashboard/QuickAction.vue'
import ActivityList from '@/components/dashboard/ActivityList.vue'
import { formatCurrency } from '@/utils/formatters'

const adminStore = useAdminStore()
const stats = ref({
  totalUsers: 0,
  activeLoans: 0,
  overdueBooks: 0,
  revenue: 0
})
const recentActivities = ref([])

const quickActions = [
  {
    id: 'create-user',
    name: 'Create User',
    description: 'Add a new user to the system',
    icon: 'UserPlusIcon'
  },
  {
    id: 'manage-books',
    name: 'Manage Books',
    description: 'View and manage book inventory',
    icon: 'BookOpenIcon'
  },
  {
    id: 'generate-report',
    name: 'Generate Report',
    description: 'Create system reports',
    icon: 'ChartBarIcon'
  }
]

onMounted(async () => {
  try {
    await Promise.all([
      fetchStats(),
      fetchActivities()
    ])
  } catch (error) {
    console.error('Error loading dashboard:', error)
  }
})

const fetchStats = async () => {
  const data = await adminStore.fetchDashboardStats()
  stats.value = data
}

const fetchActivities = async () => {
  const data = await adminStore.fetchRecentActivities()
  recentActivities.value = data
}

const handleQuickAction = (actionId) => {
  switch (actionId) {
    case 'create-user':
      // Implement user creation logic
      break
    case 'manage-books':
      // Navigate to book management
      router.push('/admin/books')
      break
    case 'generate-report':
      // Show report generation modal
      break
  }
}
</script>