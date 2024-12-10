
export const useAdminStore = defineStore('admin', {
    state: () => ({
        users: [],
        roles: [],
        permissions: [],
        auditLogs: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            limit: 10,
            total: 0
        },
        filters: {
            role: '',
            status: '',
            search: ''
        }
    }),

    actions: {
        async fetchUsers() {
            try {
                const { data } = await api.get('/api/admin', {
                    params: {
                        page: this.pagination.currentPage,
                        limit: this.pagination.limit,
                        ...this.filters
                    }
                })
                this.users = data.users
                this.pagination = {
                    total: data.total,
                    currentPage: data.page,
                    totalPages: data.totalPages,
                    limit: data.limit
                }
            } catch (error) {
                throw error
            }
        },

        async fetchRoles() {
            try {
                const { data } = await api.get('/api/roles')
                this.roles = data.roles
            } catch (error) {
                throw error
            }
        },

        async fetchPermissions() {
            try {
                const { data } = await api.get('/api/permissions')
                this.permissions = data.permissions
            } catch (error) {
                throw error
            }
        },

        async updateUserRole(userId, roleId) {
            try {
                await api.patch(`/api/roles/${userId}/promote`, { roleId })
                await this.fetchUsers()
            } catch (error) {
                throw error
            }
        },

        async toggleUserActivation(userId, isActive) {
            try {
                await api.patch(`/api/admin/${userId}/toggle-activation`, { isActive })
                await this.fetchUsers()
            } catch (error) {
                throw error
            }
        },

        async fetchAuditLogs(params = {}) {
            try {
                const { data } = await api.get('/api/audit-log', { params })
                this.auditLogs = data.logs
                return data
            } catch (error) {
                throw error
            }
        }
    }
})
