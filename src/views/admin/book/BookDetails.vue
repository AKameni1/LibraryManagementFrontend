<!-- views/admin/book/BookDetails.vue -->
<template>
  <div class="bg-white shadow rounded-lg">
    <!-- Book Info Header -->
    <div class="p-6 border-b">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold">{{ book?.Title }}</h1>
          <p class="text-gray-600">by {{ book?.Author }}</p>
        </div>
        <span :class="statusClass">{{ book?.Availability }}</span>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="p-4 bg-gray-50 border-b">
      <div class="flex space-x-4">
        <button
            v-if="book?.Availability === 'Available'"
            @click="showLoanModal = true"
            class="btn-primary"
        >
          Loan Book
        </button>
        <button
            v-if="book?.Availability === 'Borrowed'"
            @click="handleReturn"
            class="btn-secondary"
        >
          Return Book
        </button>
      </div>
    </div>

    <!-- Book Details Grid -->
    <div class="grid md:grid-cols-2 gap-6 p-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <div>
          <h3 class="font-medium">Details</h3>
          <dl class="mt-2 space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <dt class="text-gray-600">ISBN</dt>
              <dd>{{ book?.ISBN }}</dd>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <dt class="text-gray-600">Category</dt>
              <dd>{{ book?.Category?.CategoryName }}</dd>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <dt class="text-gray-600">Published Year</dt>
              <dd>{{ book?.PublishedYear }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Right Column - Current Loan Info -->
      <div v-if="currentLoan" class="space-y-6">
        <div>
          <h3 class="font-medium">Current Loan</h3>
          <dl class="mt-2 space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <dt class="text-gray-600">Borrowed By</dt>
              <dd>{{ currentLoan.User?.Username }}</dd>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <dt class="text-gray-600">Due Date</dt>
              <dd>{{ formatDate(currentLoan.EndDate) }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>

  <!-- Loan Modal -->
  <LoanModal
      v-if="showLoanModal"
      :book="book"
      @close="showLoanModal = false"
      @loan-processed="handleLoanProcessed"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import LoanModal from '@/components/LoanModal.vue'

// ... rest of the logic
</script>