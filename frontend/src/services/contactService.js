import API from './api'

export const importContactsAPI = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await API.post('/contacts/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const getContactsAPI = async () => {
  const { data } = await API.get('/contacts')
  return data
}