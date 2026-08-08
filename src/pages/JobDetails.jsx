import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getJob } from '../services/jobService'

function JobDetails() {
  const [job, setJob] = useState(null)
  const { id } = useParams()

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

  return (
    <div>
      <h1>{job.jobTitle}</h1>

      <p>Company: {job.companyName}</p>
      <p>Location: {job.location}</p>
      <p>Type: {job.jobType}</p>
      <p>Salary: {job.salary}</p>

      <h3>Description</h3>
      <p>{job.jobDescription}</p>
    </div>
  )
}

export default JobDetails
