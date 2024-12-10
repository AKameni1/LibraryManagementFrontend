<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <!-- User Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
          title="Books Borrowed"
          :value="stats.borrowedBooks"
          icon="BookOpenIcon"
      />
      <StatCard
          title="Due Soon"
          :value="stats.dueSoon"
          icon="ClockIcon"
          :trend="dueSoonTrend"
          trendColor="yellow"
      />
      <StatCard
          title="Penalty Points"
          :value="stats.penaltyPoints"
          icon="ExclamationCircleIcon"
          trendColor="red"
      />
    </div>

    <!-- Current Loans -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 border-b">
        <h3 class="text-lg font-medium">Current Loans</h3>
      </div>
      <div class="p-4">
        <LoanList
            :loans="currentLoans"
            @extend="handleExtendLoan"
            @return="handleReturnBook"
        />
      </div>
    </div>

    <!-- Reading History -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b">
        <h3 class="text-lg font-medium">Reading History</h3>
      </div>
      <div class="p-4">
        <ReadingHistory :history="readingHistory" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import StatCard from '@/components/dashboard/StatCard.vue'
import LoanList from '@/components/dashboard/LoanList.vue'
import ReadingHistory from '@/components/dashboard/ReadingHistory.vue'

const userStore = useUserStore()
const stats = ref({
  borrowedBooks: 0,
  dueSoon: 0,
  penaltyPoints: 0
})
const currentLoans = ref([])
const readingHistory = ref([])

const dueSoonTrend = computed(() => {
  return stats.value.dueSoon > 0 ? `${stats.value.dueSoon} due this week` : null
})

onMounted(async () => {
  try {
    await Promise.all([
      fetchStats(),
      fetchLoans(),
      fetchHistory()
    ])
  } catch (error) {
    console.error('Error loading dashboard:', error)
  }
})

const fetchStats = async () => {
  const data = await userStore.fetchUserStats()
  stats.value = data
}

const fetchLoans = async () => {
  const data = await userStore.fetchCurrentLoans()
  currentLoans.value = data
}

const fetchHistory = async () => {
  const data = await userStore.fetchReadingHistory()
  readingHistory.value = data
}

const handleExtendLoan = async (loanId) => {
  await userStore.extendLoan(loanId)
  await fetchLoans()
}

const handleReturnBook = async (loanId) => {
  await userStore.returnBook(loanId)
  await fetchLoans()
}
</script>