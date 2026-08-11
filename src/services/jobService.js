import api from './api'

async function getAllJobs(filters = {}) {
  const response = await api.get('/jobs', {
    params: filters
  })
  return response.data.jobs
}

async function getJob(id) {
  const response = await api.get(`/jobs/${id}`)
  return response.data.job
}

async function createJob(body) {
  const response = await api.post('/jobs', body)
  return response.data.job
}

async function updateJob(id, body) {
  const response = await api.patch(`/jobs/${id}`, body)
  return response.data.job
}

async function deleteJob(id) {
  const response = await api.delete(`/jobs/${id}`)
  return response.data
}
async function getMyJobs() {
  const response = await api.get('/jobs/my-jobs')
  return response.data
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob, getMyJobs }
