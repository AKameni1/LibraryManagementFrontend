// utils/formatters.js

// Date formatting
export const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

// Time formatting
export const formatTime = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

// DateTime formatting
export const formatDateTime = (date) => {
    if (!date) return '-'
    return `${formatDate(date)} ${formatTime(date)}`
}

// Status class formatting for UI
export const getStatusClass = (status) => {
    const classes = {
        Available: 'bg-green-100 text-green-800',
        Borrowed: 'bg-yellow-100 text-yellow-800',
        Reserved: 'bg-blue-100 text-blue-800',
        Late: 'bg-red-100 text-red-800',
        Returned: 'bg-gray-100 text-gray-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

// Format loan status
export const getLoanStatusClass = (status) => {
    const classes = {
        Borrowed: 'bg-yellow-100 text-yellow-800',
        Returned: 'bg-green-100 text-green-800',
        Late: 'bg-red-100 text-red-800',
        Extended: 'bg-blue-100 text-blue-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

// Format ISBN
export const formatISBN = (isbn) => {
    if (!isbn) return '-'
    return isbn.replace(/(\d{3})(\d{1})(\d{5})(\d{3})(\d{1})/, '$1-$2-$3-$4-$5')
}

// Format user role for display
export const formatRole = (role) => {
    if (!role) return '-'
    return role.charAt(0).toUpperCase() + role.slice(1)
}

// Format penalty points
export const formatPenaltyPoints = (points) => {
    if (points === 0) return '0'
    return `-${points}`
}

// Get relative time
export const getRelativeTime = (date) => {
    const now = new Date()
    const diff = now - new Date(date)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    if (days < 365) return `${Math.floor(days / 30)} months ago`
    return `${Math.floor(days / 365)} years ago`
}

// Format duration (for loan periods)
export const formatDuration = (days) => {
    if (days === 0) return 'Same day'
    if (days === 1) return '1 day'
    if (days < 7) return `${days} days`
    if (days === 7) return '1 week'
    if (days < 30) return `${Math.floor(days / 7)} weeks`
    if (days === 30) return '1 month'
    return `${Math.floor(days / 30)} months`
}

// Truncate text with ellipsis
export const truncateText = (text, length = 50) => {
    if (!text) return ''
    return text.length > length ? text.substring(0, length) + '...' : text
}

// Format file size
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format percentage
export const formatPercentage = (value, decimals = 0) => {
    return `${(value * 100).toFixed(decimals)}%`
}

// Format user name (first letter of each word capitalized)
export const formatName = (name) => {
    if (!name) return '-'
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

// Get initials from name
export const getInitials = (name) => {
    if (!name) return ''
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
}