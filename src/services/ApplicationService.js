import api from './api'

async function createApplication(jobId, resumeUrl) {
  const response = await api.post('/applications', {
    job: jobId,
    resumeUrl
  })
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

async function getJobApplications(jobId) {
  const response = await api.get(`/applications/job/${jobId}`)
  return response.data
}

async function updateApplicationStatus(id, status) {
  const response = await api.put(`/applications/${id}/status`, {
    status: status
  })

  return response.data
}

async function updateInterviewDate(id, interviewDate) {
  const response = await api.put(`/applications/${id}/interview-date`, {
    interviewDate: interviewDate
  })
  return response.data
}

export {
  createApplication,
  getMyApplications,
  withdrawApplication,
  getJobApplications,
  updateApplicationStatus,
  updateInterviewDate
}
