<!-- components/UserModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div class="absolute right-0 top-0 pr-4 pt-4">
            <button @click="$emit('close')" class="rounded-md bg-white text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="sm:flex sm:items-start">
            <div class="w-full">
              <h3 class="text-xl font-semibold leading-6 text-gray-900 mb-4">
                {{ user ? 'Edit User' : 'Create New User' }}
              </h3>

              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Username</label>
                  <input
                      v-model="formData.username"
                      type="text"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                      v-model="formData.email"
                      type="email"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div v-if="!user">
                  <label class="block text-sm font-medium text-gray-700">Password</label>
                  <input
                      v-model="formData.password"
                      type="password"
                      :required="!user"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Role</label>
                  <select
                      v-model="formData.roleId"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option v-for="role in adminStore.roles" :key="role.RoleID" :value="role.RoleID">
                      {{ role.Name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Loan Limit</label>
                  <input
                      v-model.number="formData.loanLimit"
                      type="number"
                      min="0"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div class="flex justify-end gap-3 mt-6">
                  <button
                      type="button"
                      @click="$emit('close')"
                      class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                      type="submit"
                      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    {{ user ? 'Update' : 'Create' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '@/stores/adminStore'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])
const adminStore = useAdminStore()

const formData = ref({
  username: '',
  email: '',
  password: '',
  roleId: '',
  loanLimit: 3
})

onMounted(() => {
  if (props.user) {
    formData.value = {
      username: props.user.Username,
      email: props.user.Email,
      roleId: props.user.Role.RoleID,
      loanLimit: props.user.LoanLimit
    }
  }
})

const handleSubmit = () => {
  emit('save', formData.value)
}
</script>