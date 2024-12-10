<!-- views/admin/book/BookCatalog.vue -->
<template>
  <div class="space-y-6">
    <!-- Search and Filters -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input
              type="text"
              v-model="filters.search"
              placeholder="Search by title, author, ISBN..."
              class="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <select
              v-model="filters.category"
              class="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value="">All Categories</option>
            <option
                v-for="category in bookStore.categories"
                :key="category.CategoryID"
                :value="category.CategoryID"
            >
              {{ category.CategoryName }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Availability</label>
          <select
              v-model="filters.availability"
              class="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
              @click="applyFilters"
              class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Book Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
          v-for="book in bookStore.books"
          :key="book.BookID"
          class="bg-white shadow rounded-lg overflow-hidden"
      >
        <div class="p-4">
          <h3 class="text-lg font-medium">{{ book.Title }}</h3>
          <p class="text-gray-500">{{ book.Author }}</p>
          <div class="mt-2 flex justify-between items-center">
            <span
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="{
                'bg-green-100 text-green-800': book.Availability === 'Available',
                'bg-yellow-100 text-yellow-800': book.Availability === 'Borrowed',
                'bg-blue-100 text-blue-800': book.Availability === 'Reserved'
              }"
            >
              {{ book.Availability }}
            </span>
            <button
                @click="viewBookDetails(book.BookID)"
                class="text-indigo-600 hover:text-indigo-900"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6">
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
        <button
            @click="previousPage"
            :disabled="bookStore.pagination.currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
            @click="nextPage"
            :disabled="bookStore.pagination.currentPage === bookStore.pagination.totalPages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'

const router = useRouter()
const bookStore = useBookStore()

const filters = ref({
  search: '',
  category: '',
  availability: ''
})

onMounted(async () => {
  await Promise.all([
    bookStore.fetchBooks(),
    bookStore.fetchCategories()
  ])
})

const applyFilters = () => {
  bookStore.filters = { ...filters.value }
  bookStore.fetchBooks()
}

const viewBookDetails = (bookId) => {
  router.push(`/admin/books/${bookId}`)
}

const previousPage = () => {
  if (bookStore.pagination.currentPage > 1) {
    bookStore.pagination.currentPage--
    bookStore.fetchBooks()
  }
}

const nextPage = () => {
  if (bookStore.pagination.currentPage < bookStore.pagination.totalPages) {
    bookStore.pagination.currentPage++
    bookStore.fetchBooks()
  }
}
</script>