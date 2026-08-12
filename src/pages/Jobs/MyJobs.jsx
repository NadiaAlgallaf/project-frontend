import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { getMyJobs } from '../../services/jobService'

function MyJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function loadJobs() {
    try {
      const data = await getMyJobs()
      setJobs(data.jobs)
    } catch (error) {
      setError('Could not load jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (jobs.length === 0) {
    return <p>No jobs posted yet.</p>
  }

  return (
    <main className="container">
      <h1 className="mb-4">My Jobs</h1>

      {jobs.map((job) => (
        <div className="card mb-3" key={job._id}>
          <div className="card-body">
            <h2 className="card-title">{job.jobTitle}</h2>

            <p className="card-text">{job.companyName}</p>
            <p className="card-text">Location: {job.location}</p>
            <p className="card-text">Type: {job.jobType}</p>
            <p className="card-text">Applicants: {job.applicationCount}</p>

            <button
              className="btn btn-primary me-2"
              onClick={() => navigate(`/jobs/${job._id}/applications`)}
            >
              View Applications
            </button>

            <Link
              className="btn btn-outline-primary me-2"
              to={`/jobs/${job._id}`}
            >
              View
            </Link>

            <Link
              className="btn btn-outline-secondary"
              to={`/jobs/${job._id}/edit`}
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </main>
  )
}

export default MyJobs
