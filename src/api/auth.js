import api from './axiosInstance.js'

export const login = (credentials) => api.post('/auth/login', credentials)

export const logout = () => api.post('/auth/logout')

export const refreshToken = () => api.post('/auth/refresh-token')

export const getProfile = () => api.get('/auth/profile')
