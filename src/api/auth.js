import api from './axiosInstance.js'

export const login = (credentials) => api.post('/auth/login', credentials)

export const logout = () => api.post('/auth/logout')

export const getProfile = () => api.get('/auth/profile')

export const signup = (formData) => api.post('/users/create', formData)
