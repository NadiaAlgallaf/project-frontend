import { useState, useEffect } from 'react'
import { getAllJobs } from '../../services/jobService.js'
import { Link } from 'react-router'

function Jobs() {
  const [jobs, setJobs] = useState([])

  async function loadJobs() {
    try {
      const data = await getAllJobs()
      setJobs(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  return (
    <div>
      <h1>All Jobs</h1>

      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.jobTitle}</h2>
          <p>{job.companyName}</p>
          <p>{job.location}</p>
          <p>{job.jobType}</p>
          <p>{job.salary}</p>
          <Link to={`/jobs/${job._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  )
}

export default Jobs
