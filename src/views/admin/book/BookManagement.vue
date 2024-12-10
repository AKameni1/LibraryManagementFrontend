<!-- views/BookManagement.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between mb-6">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Book Management
          </h2>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button
              @click="openBookModal()"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Book
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select
                v-model="bookStore.filters.category"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                v-model="bookStore.filters.availability"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Borrowed">Borrowed</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Search</label>
            <input
                type="text"
                v-model="bookStore.filters.search"
                placeholder="Search by title, author, or ISBN..."
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div class="flex items-end">
            <button
                @click="bookStore.fetchBooks()"
                class="w-full bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Book List -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title/Author</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="book in bookStore.books" :key="book.BookID">
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ book.Title }}</div>
                  <div class="text-sm text-gray-500">{{ book.Author }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ book.Category.CategoryName }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ book.ISBN }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
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
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                  @click="openBookModal(book)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button
                  @click="showBookDetails(book)"
                  class="text-green-600 hover:text-green-900 mr-4"
              >
                Details
              </button>
              <button
                  v-if="canDeleteBook"
                  @click="confirmDelete(book)"
                  class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
              @click="previousPage"
              :disabled="bookStore.pagination.currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
              @click="nextPage"
              :disabled="bookStore.pagination.currentPage === bookStore.pagination.totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Book Modal -->
    <BookModal
        v-if="showBookModal"
        :book="selectedBook"
        @close="closeBookModal"
        @save="saveBook"
    />

    <!-- Book Details Modal -->
    <BookDetailsModal
        v-if="showDetailsModal"
        :book="selectedBook"
        @close="closeDetailsModal"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
        v-if="showDeleteModal"
        :title="'Delete Book'"
        :message="`Are you sure you want to delete '${selectedBook?.Title}'? This action cannot be undone.`"
        @confirm="deleteBook"
        @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import { useAuthStore } from '@/stores/authStore'
import BookModal from '@/components/BookModal.vue'
import BookDetailsModal from '@/components/BookDetailsModal.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'

const bookStore = useBookStore()
const authStore = useAuthStore()

const showBookModal = ref(false)
const showDetailsModal = ref(false)
const showDeleteModal = ref(false)
const selectedBook = ref(null)

const canDeleteBook = computed(() => {
  return authStore.hasPermission('delete_book')
})

onMounted(async () => {
  await Promise.all([
    bookStore.fetchBooks(),
    bookStore.fetchCategories()
  ])
})

const openBookModal = (book = null) => {
  selectedBook.value = book
  showBookModal.value = true
}

const closeBookModal = () => {
  showBookModal.value = false
  selectedBook.value = null
}

const showBookDetails = (book) => {
  selectedBook.value = book
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedBook.value = null
}

const saveBook = async (bookData) => {
  try {
    if (selectedBook.value) {
      await bookStore.updateBook(selectedBook.value.BookID, bookData)
    } else {
      await bookStore.createBook(bookData)
    }
    closeBookModal()
    await bookStore.fetchBooks()
  } catch (error) {
    console.error('Error saving book:', error)
  }
}

const confirmDelete = (book) => {
  selectedBook.value = book
  showDeleteModal.value = true
}

const deleteBook = async () => {
  try {
    await bookStore.deleteBook(selectedBook.value.BookID)
    showDeleteModal.value = false
    selectedBook.value = null
    await bookStore.fetchBooks()
  } catch (error) {
    console.error('Error deleting book:', error)
  }
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