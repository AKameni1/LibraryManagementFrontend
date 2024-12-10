<!-- views/admin/user/UserLoanHistory.vue -->
<template>
  <div class="space-y-6">
    <!-- Stats Summary -->
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Active Loans</h3>
        <p class="mt-2 text-3xl font-semibold">{{ activeLoans }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Total Loans</h3>
        <p class="mt-2 text-3xl font-semibold">{{ totalLoans }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Late Returns</h3>
        <p class="mt-2 text-3xl font-semibold text-red-600">{{ lateReturns }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">On Time Returns</h3>
        <p class="mt-2 text-3xl font-semibold text-green-600">{{ onTimeReturns }}</p>
      </div>
    </div>

    <!-- Loan History Table -->
    <div class="bg-white shadow rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borrowed</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Returned</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="loan in loanHistory" :key="loan.LoanID">
          <td class="px-6 py-4 whitespace-nowrap">{{ loan.Book?.Title }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(loan.StartDate) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(loan.EndDate) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ loan.ReturnDate ? formatDate(loan.ReturnDate) : '-' }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getLoanStatusClass(loan.Status)">
                {{ loan.Status }}
              </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
</script>