import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { getJob, deleteJob } from '../../services/jobService.js'

function JobDetails() {
  const [job, setJob] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  async function loadJob() {
    try {
      const data = await getJob(id)
      setJob(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadJob()
  }, [])

  if (!job) {
    return <p>Loading...</p>
  }

  async function handleDelete() {
    try {
      await deleteJob(id)
      navigate('/jobs')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>{job.jobTitle}</h1>

      <p>Company: {job.companyName}</p>
      <p>Location: {job.location}</p>
      <p>Type: {job.jobType}</p>
      <p>Salary: {job.salary}</p>

      <h3>Description</h3>
      <p>{job.jobDescription}</p>
      <br />
      <Link to={`/jobs/${job._id}/edit`}>Edit</Link>

      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default JobDetails
