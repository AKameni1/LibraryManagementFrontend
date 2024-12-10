<!-- components/book/QuickReturnModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Process Return</h3>
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <!-- Book Selection/Scan -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Book ISBN/ID</label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                      v-model="bookId"
                      type="text"
                      required
                      class="flex-1 rounded-md border-gray-300"
                      placeholder="Scan or enter book ID"
                      @input="fetchLoanDetails"
                  />
                </div>
              </div>

              <!-- Loan Details (if found) -->
              <div v-if="loanDetails" class="bg-gray-50 p-4 rounded-md">
                <h4 class="font-medium text-sm text-gray-700">Loan Details</h4>
                <dl class="mt-2 space-y-1">
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-500">Borrower:</dt>
                    <dd class="text-sm text-gray-900">{{ loanDetails.user.Username }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-500">Due Date:</dt>
                    <dd class="text-sm" :class="isOverdue ? 'text-red-600' : 'text-gray-900'">
                      {{ formatDate(loanDetails.EndDate) }}
                    </dd>
                  </div>
                </dl>
              </div>

              <!-- Condition Check -->
              <div v-if="loanDetails">
                <label class="block text-sm font-medium text-gray-700">Book Condition</label>
                <select
                    v-model="condition"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300"
                >
                  <option value="good">Good</option>
                  <option value="damaged">Damaged</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <!-- Notes -->
              <div v-if="condition !== 'good'">
                <label class="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                    v-model="notes"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300"
                    placeholder="Describe the damage or situation..."
                ></textarea>
              </div>
            </div>

            <!-- Warning for overdue -->
            <div v-if="isOverdue" class="mt-4 p-4 bg-yellow-50 rounded-md">
              <div class="flex">
                <div class="text-yellow-700">
                  <p class="text-sm">This book is overdue. Late fees will be applied.</p>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="mt-6 flex justify-end space-x-3">
              <button
                  type="button"
                  @click="$emit('close')"
                  class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  :disabled="processing || !loanDetails"
              >
                {{ processing ? 'Processing...' : 'Process Return' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import { formatDate } from '@/utils/formatters'

const bookStore = useBookStore()
const processing = ref(false)
const bookId = ref('')
const loanDetails = ref(null)
const condition = ref('good')
const notes = ref('')

const isOverdue = computed(() => {
  if (!loanDetails.value) return false
  return new Date(loanDetails.value.EndDate) < new Date()
})

const fetchLoanDetails = async () => {
  if (bookId.value.length < 3) return
  try {
    const details = await bookStore.getActiveLoan(bookId.value)
    loanDetails.value = details
  } catch (error) {
    console.error('Error fetching loan details:', error)
    loanDetails.value = null
  }
}

const handleSubmit = async () => {
  try {
    processing.value = true
    await bookStore.processReturn({
      loanId: loanDetails.value.LoanID,
      condition: condition.value,
      notes: notes.value,
      isOverdue: isOverdue.value
    })
    $emit('return-processed')
  } catch (error) {
    console.error('Error processing return:', error)
  } finally {
    processing.value = false
  }
}
</script>