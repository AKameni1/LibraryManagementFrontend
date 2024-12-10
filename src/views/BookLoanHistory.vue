<template>
  <div class="bg-white shadow rounded-lg">
    <!-- Book Info Header -->
    <div class="px-6 py-4 border-b">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-medium text-gray-900">{{ book?.Title }}</h2>
          <p class="text-gray-500">ISBN: {{ formatISBN(book?.ISBN) }}</p>
        </div>
        <span
            class="px-3 py-1 rounded-full text-sm font-medium"
            :class="getStatusClass(book?.Availability)"
        >
          {{ book?.Availability }}
        </span>
      </div>
    </div>

    <!-- Loan Statistics -->
    <div class="grid grid-cols-4 gap-4 p-6 border-b bg-gray-50">
      <div>
        <span class="text-sm font-medium text-gray-500">Total Loans</span>
        <p class="mt-1 text-2xl font-semibold text-gray-900">{{ loanStats.totalLoans }}</p>
      </div>
      <div>
        <span class="text-sm font-medium text-gray-500">Active Loans</span>
        <p class="mt-1 text-2xl font-semibold text-indigo-600">{{ loanStats.activeLoans }}</p>
      </div>
      <div>
        <span class="text-sm font-medium text-gray-500">Late Returns</span>
        <p class="mt-1 text-2xl font-semibold text-red-600">{{ loanStats.lateReturns }}</p>
      </div>
      <div>
        <span class="text-sm font-medium text-gray-500">On-time Returns</span>
        <p class="mt-1 text-2xl font-semibold text-green-600">{{ loanStats.onTimeReturns }}</p>
      </div>
    </div>

    <!-- Loan History Table -->
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Loan History</h3>

        <!-- Filters -->
        <div class="flex gap-4">
          <select
              v-model="filters.status"
              class="rounded-md border-gray-300 text-sm"
          >
            <option value="">All Status</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Returned">Returned</option>
            <option value="Late">Late</option>
          </select>

          <select
              v-model="filters.period"
              class="rounded-md border-gray-300 text-sm"
          >
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="180">Last 6 months</option>
            <option value="365">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
          <tr>
            <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">User</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Borrowed Date</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Date</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Return Date</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="loan in filteredLoans" :key="loan.LoanID">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
              <div class="flex items-center">
                <div class="h-8 w-8 flex-shrink-0">
                    <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                      {{ getInitials(loan.User.Username) }}
                    </span>
                </div>
                <div class="ml-4">
                  <div class="font-medium text-gray-900">{{ loan.User.Username }}</div>
                  <div class="text-gray-500">{{ loan.User.Email }}</div>
                </div>
              </div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ formatDateTime(loan.StartDate) }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ formatDateTime(loan.EndDate) }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ loan.ReturnDate ? formatDateTime(loan.ReturnDate) : '-' }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm">
                <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getLoanStatusClass(loan.Status)"
                >
                  {{ loan.Status }}
                </span>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ formatDuration(getDurationInDays(loan)) }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex items-center justify-between">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
              @click="prevPage"
              :disabled="page === 1"
              class="btn-outline"
          >
            Previous
          </button>
          <button
              @click="nextPage"
              :disabled="page === totalPages"
              class="btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import {
  formatDateTime,
  formatISBN,
  getStatusClass,
  getLoanStatusClass,
  formatDuration,
  getInitials
} from '@/utils/formatters'

const route = useRoute()
const bookStore = useBookStore()

const book = ref(null)
const loanHistory = ref([])
const page = ref(1)
const totalPages = ref(1)
const filters = ref({
  status: '',
  period: '30'
})

const loanStats = computed(() => {
  return {
    totalLoans: loanHistory.value.length,
    activeLoans: loanHistory.value.filter(loan => loan.Status === 'Borrowed').length,
    lateReturns: loanHistory.value.filter(loan => loan.Status === 'Late').length,
    onTimeReturns: loanHistory.value.filter(loan => loan.Status === 'Returned' && !isLate(loan)).length
  }
})

const filteredLoans = computed(() => {
  let filtered = [...loanHistory.value]

  if (filters.value.status) {
    filtered = filtered.filter(loan => loan.Status === filters.value.status)
  }

  if (filters.value.period !== 'all') {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(filters.value.period))
    filtered = filtered.filter(loan => new Date(loan.StartDate) >= cutoffDate)
  }

  return filtered
})

const getDurationInDays = (loan) => {
  const start = new Date(loan.StartDate)
  const end = loan.ReturnDate ? new Date(loan.ReturnDate) : new Date(loan.EndDate)
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
}

const isLate = (loan) => {
  if (!loan.ReturnDate) return false
  return new Date(loan.ReturnDate) > new Date(loan.EndDate)
}

onMounted(async () => {
  const bookId = route.params.id
  try {
    const [bookData, loanData] = await Promise.all([
      bookStore.getBookById(bookId),
      bookStore.getBookLoanHistory(bookId)
    ])
    book.value = bookData
    loanHistory.value = loanData
  } catch (error) {
    console.error('Error fetching book loan history:', error)
  }
})

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
  }
}
</script>