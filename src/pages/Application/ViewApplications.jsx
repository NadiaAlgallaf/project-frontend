import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  getJobApplications,
  updateApplicationStatus,
  updateInterviewDate
} from '../../services/ApplicationService.js'

function ViewApplications() {
  const { jobId } = useParams()

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [interviewDate, setInterviewDate] = useState('')

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

  async function handleInterviewDate(applicationId) {
    if (new Date(interviewDate) < new Date()) {
      alert('Please choose a future date and time')
      return
    }
    try {
      await updateInterviewDate(applicationId, interviewDate)
      alert('Interview date saved')
      loadApplications()
    } catch (error) {
      console.log(error)
    }
  }

  function getCurrentDateTime() {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
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
    <main className="container mt-4">
      <h1 className="mb-4">Applications</h1>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        applications.map((application) => (
          <div className="card mb-3" key={application._id}>
            <div className="card-body">
              <h3 className="card-title">
                {application.applicant.firstName}{' '}
                {application.applicant.lastName}
              </h3>

              <p>
                <strong>Email:</strong> {application.applicant.email}
              </p>

              <p>
                <strong>Status:</strong> {application.status}
              </p>
              {application.interviewDate && (
                <div className="mb-3">
                  <p>
                    <strong>Interview Date:</strong>{' '}
                    {new Date(application.interviewDate).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Interview Time:</strong>{' '}
                    {new Date(application.interviewDate).toLocaleTimeString(
                      [],
                      {
                        hour: '2-digit',
                        minute: '2-digit'
                      }
                    )}
                  </p>
                </div>
              )}
              <p>
                <strong>Resume:</strong>{' '}
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>
              </p>

              <button
                className="btn btn-outline-primary me-2"
                onClick={() => handleStatus(application._id, 'Interview')}
              >
                Interview
              </button>

              <button
                className="btn btn-outline-success me-2"
                onClick={() => handleStatus(application._id, 'Accepted')}
              >
                Accept
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => handleStatus(application._id, 'Rejected')}
              >
                Reject
              </button>

              {application.status === 'Interview' && (
                <div className="mt-3">
                  <label className="form-label">Interview Date</label>

                  <input
                    className="form-control mb-2"
                    type="datetime-local"
                    min={getCurrentDateTime()}
                    value={interviewDate}
                    onChange={(event) => setInterviewDate(event.target.value)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={() => handleInterviewDate(application._id)}
                  >
                    Save Date
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </main>
  )
}

export default ViewApplications
