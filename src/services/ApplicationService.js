import api from './api'

async function createApplication(jobId) {
  const response = await api.post('/applications', { job: jobId })
  return response.data
}

async function getMyApplications() {
  const response = await api.get('/applications/my-applications')
  return response.data
}

async function withdrawApplication(ApplicationId) {
  const response = await api.delete(`/applications/${ApplicationId}`)
  return response.data
}

export { createApplication, getMyApplications, withdrawApplication }
