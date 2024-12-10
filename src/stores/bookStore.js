import { defineStore } from 'pinia'
import api from '../api/axiosInstance.js'

export const useBookStore = defineStore('book', {
    state: () => ({
        books: [],
        currentBook: null,
        categories: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            limit: 10,
            total: 0
        },
        filters: {
            category: '',
            availability: '',
            search: ''
        },
        loading: false,
        error: null
    }),

    actions: {
        async fetchBooks() {
            try {
                this.loading = true
                const response = await api.get('/books', {
                    params: {
                        page: this.pagination.currentPage,
                        limit: this.pagination.limit,
                        ...this.filters
                    }
                })
                this.books = response.data.books
                this.pagination = {
                    currentPage: response.data.page,
                    totalPages: response.data.totalPages,
                    total: response.data.total,
                    limit: response.data.limit
                }
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async getBookById(id) {
            try {
                this.loading = true
                const response = await api.get(`/books/${id}`)
                this.currentBook = response.data
                return response.data
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async createBook(bookData) {
            try {
                this.loading = true
                const response = await api.post('/books', bookData)
                return response.data
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateBook(id, bookData) {
            try {
                this.loading = true
                const response = await api.patch(`/books/${id}`, bookData)
                return response.data
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteBook(id) {
            try {
                this.loading = true
                await api.delete(`/books/${id}`)
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchCategories() {
            try {
                const response = await api.get('/categories')
                this.categories = response.data.categories
            } catch (error) {
                this.error = error.message
                throw error
            }
        }
    }
})
