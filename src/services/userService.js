import api from './api'

const userService = {
    async fetchUsers(params) {
        const response = await api.get('/admin', { params })
        return response.data
    },

    async getUser(id) {
        const response = await api.get(`/admin/${id}`)
        return response.data
    },

    async updateUser(id, userData) {
        const response = await api.patch(`/admin/${id}`, userData)
        return response.data
    },

    async toggleUserActivation(id, isActive) {
        const response = await api.patch(`/admin/${id}/toggle-activation`, { isActive })
        return response.data
    }
}

export default userService
