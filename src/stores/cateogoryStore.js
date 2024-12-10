export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            limit: 10,
            total: 0
        }
    }),

    actions: {
        async fetchCategories() {
            try {
                const { data } = await api.get('/api/categories', {
                    params: {
                        page: this.pagination.currentPage,
                        limit: this.pagination.limit
                    }
                })
                this.categories = data.categories
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

        async createCategory(categoryData) {
            try {
                const { data } = await api.post('/api/categories', categoryData)
                await this.fetchCategories()
                return data
            } catch (error) {
                throw error
            }
        },

        async deleteCategory(categoryId) {
            try {
                await api.delete(`/api/categories/${categoryId}`)
                await this.fetchCategories()
            } catch (error) {
                throw error
            }
        }
    }
})