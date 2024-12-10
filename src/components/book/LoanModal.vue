<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div class="p-6">
            <h3 class="text-lg font-medium">Process Loan</h3>
            <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">User</label>
                <input
                    v-model="formData.userId"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300"
                    placeholder="User ID or Email"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                    v-model="formData.dueDate"
                    type="date"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div class="flex justify-end space-x-3">
                <button
                    type="button"
                    @click="$emit('close')"
                    class="btn-outline"
                >
                  Cancel
                </button>
                <button
                    type="submit"
                    class="btn-primary"
                >
                  Process Loan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>