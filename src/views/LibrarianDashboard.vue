<!-- views/LibrarianDashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Active Loans</h3>
          <p class="mt-2 text-3xl font-semibold">{{ stats.activeLoans }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Overdue Books</h3>
          <p class="mt-2 text-3xl font-semibold text-red-600">{{ stats.overdueBooks }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Pending Returns</h3>
          <p class="mt-2 text-3xl font-semibold">{{ stats.pendingReturns }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Active Reservations</h3>
          <p class="mt-2 text-3xl font-semibold">{{ stats.activeReservations }}</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div class="flow-root">
            <ul class="-mb-8">
              <li v-for="activity in recentActivity" :key="activity.id">
                <div class="relative pb-8">
                  <div class="relative flex space-x-3">
                    <div>
                      <span
                          class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                          :class="{
                          'bg-green-100': activity.type === 'borrow',
                          'bg-blue-100': activity.type === 'return',
                          'bg-yellow-100': activity.type === 'reserve'
                        }"
                      >
                        <span class="text-sm">{{ activity.icon }}</span>
                      </span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div>
                        <p class="text-sm text-gray-500">
                          {{ activity.message }}
                        </p>
                        <p class="mt-0.5 text-sm text-gray-500">
                          {{ formatDate(activity.timestamp) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>