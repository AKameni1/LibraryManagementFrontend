export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || 'Une erreur est survenue'
  }
  return 'Erreur réseau ou problème serveur'
}
