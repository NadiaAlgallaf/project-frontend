import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  getJobApplications,
  updateApplicationStatus
} from '../../services/ApplicationService.js'

function ViewApplications() {
  const { jobId } = useParams()

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadApplications() {
    try {
      const data = await getJobApplications(jobId)

      setApplications(data.applications)
    } catch (error) {
      console.log(error)
      setError('Could not load applications')
    } finally {
      setLoading(false)
    }
  }

  async function handleStatus(id, status) {
    try {
      await updateApplicationStatus(id, status)

      loadApplications()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadApplications()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Applications</h1>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        applications.map((application) => (
          <div key={application._id}>
            <h3>
              {application.applicant.firstName} {application.applicant.lastName}
            </h3>
            <p>Email: {application.applicant.email}</p>
            <p>Status: {application.status}</p>
            <p>
              Resume:{' '}
              <a href={application.resumeUrl} target="_blank">
                View Resume
              </a>
            </p>

            <button onClick={() => handleStatus(application._id, 'Interview')}>
              Interview
            </button>

            <button onClick={() => handleStatus(application._id, 'Accepted')}>
              Accept
            </button>

            <button onClick={() => handleStatus(application._id, 'Rejected')}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default ViewApplications
