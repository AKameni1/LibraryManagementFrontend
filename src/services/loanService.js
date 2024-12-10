import api from './api'

const loanService = {
    async createLoan(userId, bookId, endDate) {
        const response = await api.post(`/loans/${userId}/borrow`, {
            bookId,
            endDate
        })
        return response.data
    },

    async returnBook(loanId) {
        const response = await api.post(`/loans/return/${loanId}`)
        return response.data
    },

    async extendLoan(loanId, newEndDate) {
        const response = await api.post(`/loans/extend/${loanId}`, { newEndDate })
        return response.data
    },

    async getLoanHistory() {
        const response = await api.get('/loans/history')
        return response.data
    }
}

export default loanService