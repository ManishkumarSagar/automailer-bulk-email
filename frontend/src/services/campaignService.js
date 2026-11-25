import API from './api'

export const createCampaignAPI = async (campaignData) => {
  const { data } = await API.post('/campaigns', campaignData)
  return data
}

export const getCampaignsAPI = async () => {
  const { data } = await API.get('/campaigns')
  return data
}

// NAYA
export const getAnalyticsAPI = async () => {
  const { data } = await API.get('/campaigns/analytics')
  return data
}