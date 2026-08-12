import { useEffect, useState } from 'react'
import {
  getMyApplications,
  withdrawApplication
} from '../../services/ApplicationService'

function MyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadApplications() {
    try {
      const data = await getMyApplications()
      setApplications(data.applications)
    } catch (error) {
      setError('Could not load applications')
    } finally {
      setLoading(false)
    }
  }

  async function handleWithdraw(id) {
    try {
      await withdrawApplication(id)
      loadApplications()
    } catch (error) {
      setError('Could not withdraw application')
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

  if (applications.length === 0) {
    return <p>No applications yet.</p>
  }

  return (
    <main className="container mt-4">
      <h1 className="mb-4">My Applications</h1>

      {applications.map((application) => (
        <div className="card mb-3" key={application._id}>
          <div className="card-body">
            <h2 className="card-title">{application.job.jobTitle}</h2>

            <p>
              <strong>Company:</strong> {application.job.companyName}
            </p>

            <p>
              <strong>Status:</strong> {application.status}
            </p>

            <p>
              <strong>Location:</strong> {application.job.location}
            </p>

            {application.interviewDate && (
              <div className="mb-3">
                <p>
                  <strong>Interview Date:</strong>{' '}
                  {new Date(application.interviewDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Interview Time:</strong>{' '}
                  {new Date(application.interviewDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}

            <button
              className="btn btn-outline-danger"
              onClick={() => handleWithdraw(application._id)}
            >
              Withdraw
            </button>
          </div>
        </div>
      ))}
    </main>
  )
}

export default MyApplications
