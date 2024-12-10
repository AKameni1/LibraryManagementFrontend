<!-- components/BookDetailsModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          <div class="absolute right-0 top-0 pr-4 pt-4">
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="sm:flex sm:items-start">
            <div class="w-full">
              <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Book Details</h3>

              <!-- Basic Info -->
              <div class="bg-gray-50 p-4 rounded-lg mb-6">
                <dl class="grid grid-cols-2 gap-4">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Title</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ book.Title }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Author</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ book.Author }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">ISBN</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ book.ISBN }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Category</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ book.Category.CategoryName }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Published Year</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ book.PublishedYear }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                    <dd class="mt-1">
                      <span
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="{
                          'bg-green-100 text-green-800': book.Availability === 'Available',
                          'bg-yellow-100 text-yellow-800': book.Availability === 'Borrowed',
                          'bg-blue-100 text-blue-800': book.Availability === 'Reserved'
                        }"
                      >
                        {{ book.Availability }}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <!-- Current Loan Info -->
              <div v-if="currentLoan" class="mb-6">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Current Loan</h4>
                <div class="bg-yellow-50 p-4 rounded-lg">
                  <dl class="grid grid-cols-2 gap-4">
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Borrowed By</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ currentLoan.User.Username }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Due Date</dt>
                      <dd class="mt-1 text-sm text-gray-900">{{ formatDate(currentLoan.EndDate) }}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- Loan History -->
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">Loan History</h4>
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                      <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">User</th>
                      <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Date</th>
                      <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Date</th>
                      <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="loan in loanHistory" :key="loan.LoanID">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                        {{ loan.User.Username }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ formatDate(loan.StartDate) }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ formatDate(loan.EndDate) }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                              :class="{
                              'bg-green-100 text-green-800': loan.Status === 'Returned',
                              'bg-yellow-100 text-yellow-800': loan.Status === 'Borrowed',
                              'bg-red-100 text-red-800': loan.Status === 'Late'
                            }"
                          >
                            {{ loan.Status }}
                          </span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBookStore } from '@/stores/bookStore'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const currentLoan = ref(null)
const loanHistory = ref([])

onMounted(async () => {
  try {
    const response = await fetch(`/api/loans/book/${props.book.BookID}`)
    const data = await response.json()
    loanHistory.value = data.loanHistory
    currentLoan.value = data.currentLoan
  } catch (error) {
    console.error('Error fetching loan history:', error)
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>