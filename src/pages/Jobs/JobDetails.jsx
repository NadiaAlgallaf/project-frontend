import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { getJob, deleteJob } from '../../services/jobService.js'
import { useAuth } from '../../context/AuthContext'
import { createApplication } from '../../services/ApplicationService.js'

function JobDetails() {
  const [job, setJob] = useState(null)
  const [error, setError] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()

  const { user } = useAuth()

  async function loadJob() {
    try {
      setError('')

      const data = await getJob(id)

      setJob(data)
    } catch (error) {
      console.log(error)

      setError(error?.response?.data?.message || 'Unable to load this job.')
    }
  }

  useEffect(() => {
    loadJob()
  }, [id])

  if (error) {
    return (
      <div>
        <h2>Unable to load job</h2>
        <p>{error}</p>

        <Link to="/jobs">Back to Jobs</Link>
      </div>
    )
  }

  if (!job) {
    return <p>Loading...</p>
  }

  async function handleDelete() {
    try {
      await deleteJob(id)

      navigate('/jobs')
    } catch (error) {
      console.log(error)

      setError(error?.response?.data?.message || 'Unable to delete this job.')
    }
  }

  async function handleApply() {
    const resumeUrl = window.prompt('please enter your resume URL')

    if (!resumeUrl) {
      return
    }

    try {
      await createApplication(job._id, resumeUrl)

      alert('Application submitted successfully')

      navigate('/my-applications')
    } catch (error) {
      console.log(error)

      setError(
        error?.response?.data?.message || 'Unable to submit application.'
      )
    }
  }

  const isOwner =
    user && job.createdBy && job.createdBy.toString() === user._id.toString()

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">

          <h1 className="card-title">{job.jobTitle}</h1>

          <p>
            <strong>Company:</strong> {job.companyName}
          </p>

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <p>
            <strong>Type:</strong> {job.jobType}
          </p>

          <p>
            <strong>Salary:</strong> {job.salary}
          </p>

         
          <p>
           <strong>Desicription:</strong>{job.jobDescription}
            </p> 

          <p>
            <strong>Requirements:</strong> {job.requirements}
          </p>

          <p>
            <strong>Education:</strong> {job.education}
          </p>

          <p>
            <strong>Experience:</strong> {job.experience}
          </p>

  

          {user?.role === 'JobSeeker' && (
            <button className="btn btn-primary me-2" onClick={handleApply}>
              Apply
            </button>
          )}

          {isOwner && (
            <div className="mt-3">
              <Link
                className="btn btn-outline-primary me-2"
                to={`/jobs/${job._id}/edit`}
              >
                Edit
              </Link>

              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default JobDetails