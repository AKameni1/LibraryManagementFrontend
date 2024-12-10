import api from './api'

const bookService = {
    async fetchBooks(params) {
        const response = await api.get('/books', { params })
        return response.data
    },

    async getBook(id) {
        const response = await api.get(`/books/${id}`)
        return response.data
    },

    async createBook(bookData) {
        const response = await api.post('/books', bookData)
        return response.data
    },

    async updateBook(id, bookData) {
        const response = await api.patch(`/books/${id}`, bookData)
        return response.data
    },

    async deleteBook(id) {
        const response = await api.delete(`/books/${id}`)
        return response.data
    }
}

export default bookService