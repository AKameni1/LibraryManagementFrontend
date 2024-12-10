<!-- components/LogDetailsModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          <div class="absolute right-0 top-0 pr-4 pt-4">
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Activity Details</h3>

            <div class="space-y-4">
              <!-- Basic Info -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-500">Timestamp</label>
                  <span class="text-sm text-gray-900">{{ formatDate(log.CreatedAt) }}</span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">User</label>
                  <span class="text-sm text-gray-900">{{ log.User?.Username || 'System' }}</span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">Action</label>
                  <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getActionClass(log.Action)"
                  >
                    {{ log.Action }}
                  </span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500">Entity</label>
                  <span class="text-sm text-gray-900">{{ log.Entity }}</span>
                </div>
              </div>

              <!-- Details Section -->
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-2">Action Details</label>
                <div class="bg-gray-50 rounded-lg p-4">
                  <pre class="text-sm text-gray-900 whitespace-pre-wrap">{{ formatDetails(log.Details) }}</pre>
                </div>
              </div>

              <!-- Related Data -->
              <div v-if="hasRelatedData" class="border-t pt-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Related Information</h4>
                <div class="bg-gray-50 rounded-lg p-4">
                  <div v-if="log.Entity === 'Book'" class="space-y-2">
                    <p class="text-sm"><span class="font-medium">Book Title:</span> {{ relatedData?.Title }}</p>
                    <p class="text-sm"><span class="font-medium">Author:</span> {{ relatedData?.Author }}</p>
                    <p class="text-sm"><span class="font-medium">Status:</span> {{ relatedData?.Availability }}</p>
                  </div>
                  <div v-else-if="log.Entity === 'User'" class="space-y-2">
                    <p class="text-sm"><span class="font-medium">Username:</span> {{ relatedData?.Username }}</p>
                    <p class="text-sm"><span class="font-medium">Role:</span> {{ relatedData?.Role?.Name }}</p>
                    <p class="text-sm"><span class="font-medium">Status:</span> {{ relatedData?.IsActive ? 'Active' : 'Inactive' }}</p>
                  </div>
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
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  log: {
    type: Object,
    required: true
  }
})

const relatedData = ref(null)
const hasRelatedData = computed(() => !!relatedData.value)

onMounted(async () => {
  if (props.log.Entity === 'Book' && props.log.Details?.bookId) {
    try {
      const response = await fetch(`/api/books/${props.log.Details.bookId}`)
      relatedData.value = await response.json()
    } catch (error) {
      console.error('Error fetching book details:', error)
    }
  } else if (props.log.Entity === 'User' && props.log.Details?.userId) {
    try {
      const response = await fetch(`/api/admin/${props.log.Details.userId}`)
      relatedData.value = await response.json()
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

const formatDetails = (details) => {
  if (typeof details === 'string') {
    try {
      return JSON.stringify(JSON.parse(details), null, 2)
    } catch {
      return details
    }
  }
  return JSON.stringify(details, null, 2)
}

const getActionClass = (action) => {
  const classes = {
    create: 'bg-green-100 text-green-800',
    update: 'bg-blue-100 text-blue-800',
    delete: 'bg-red-100 text-red-800',
    login: 'bg-purple-100 text-purple-800',
    logout: 'bg-yellow-100 text-yellow-800'
  }

  for (const [key, value] of Object.entries(classes)) {
    if (action.toLowerCase().includes(key)) {
      return value
    }
  }
  return 'bg-gray-100 text-gray-800'
}
</script>