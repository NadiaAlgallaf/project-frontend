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
    <main>
      <h1>My Applications</h1>

      {applications.map((application) => (
        <div key={application._id}>
          <h2>{application.job.jobTitle}</h2>

          <p>Company: {application.job.companyName}</p>

          <p>Status: {application.status}</p>

          <p>Location: {application.job.location}</p>

          <button onClick={() => handleWithdraw(application._id)}>
            Withdraw
          </button>
        </div>
      ))}
    </main>
  )
}

export default MyApplications
