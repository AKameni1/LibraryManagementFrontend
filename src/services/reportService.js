import api from './api'

const reportService = {
    async getReports(params) {
        const response = await api.get('/report', { params })
        return response.data
    },

    async generateReport(type, parameters = {}) {
        const response = await api.post('/report', {
            reportType: type,
            parameters
        })
        return response.data
    },

    async deleteReport(id) {
        const response = await api.delete(`/report/${id}`)
        return response.data
    }
}

export default reportServicew