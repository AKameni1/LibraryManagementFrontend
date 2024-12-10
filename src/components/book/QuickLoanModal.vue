<!-- components/book/QuickLoanModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Quick Loan Processing</h3>
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
                      v-model="formData.bookId"
                      type="text"
                      required
                      class="flex-1 rounded-md border-gray-300"
                      placeholder="Scan or enter book ID"
                  />
                </div>
              </div>

              <!-- User Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700">User ID/Email</label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                      v-model="formData.userId"
                      type="text"
                      required
                      class="flex-1 rounded-md border-gray-300"
                      placeholder="Enter user ID or email"
                  />
                </div>
              </div>

              <!-- Loan Duration -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Return Date</label>
                <input
                    v-model="formData.returnDate"
                    type="date"
                    required
                    :min="minReturnDate"
                    class="mt-1 block w-full rounded-md border-gray-300"
                />
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
                  :disabled="processing"
              >
                {{ processing ? 'Processing...' : 'Process Loan' }}
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

const bookStore = useBookStore()
const processing = ref(false)

const formData = ref({
  bookId: '',
  userId: '',
  returnDate: ''
})

const minReturnDate = computed(() => {
  const today = new Date()
  today.setDate(today.getDate() + 1) // Minimum 1 day loan
  return today.toISOString().split('T')[0]
})

const handleSubmit = async () => {
  try {
    processing.value = true
    await bookStore.processLoan({
      bookId: formData.value.bookId,
      userId: formData.value.userId,
      returnDate: formData.value.returnDate
    })
    $emit('loan-processed')
  } catch (error) {
    console.error('Error processing loan:', error)
  } finally {
    processing.value = false
  }
}
</script>