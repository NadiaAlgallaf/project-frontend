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
    <main>
      <h1>My Jobs</h1>

      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.jobTitle}</h2>

          <p>{job.companyName}</p>
          <p>{job.location}</p>
          <p>{job.jobType}</p>
          <p>Applicants: {job.applicationCount}</p>

          <button onClick={() => navigate(`/jobs/${job._id}/applications`)}>
            View Applications
          </button>

          <Link to={`/jobs/${job._id}`}>View</Link>

          <Link to={`/jobs/${job._id}/edit`}>Edit</Link>
        </div>
      ))}
    </main>
  )
}

export default MyJobs
