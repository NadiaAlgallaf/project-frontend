import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createJob } from '../services/jobService'

function CreateJob() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    jobType: '',
    location: '',
    salary: ''
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await createJob(formData)
      navigate('/jobs')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Create Job</h1>

      <form onSubmit={handleSubmit}>
        <label>Job Title: </label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <br />
        <label>Company Name: </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
        <br />
        <label>Job Description: </label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
        />
        <br />
        <label>Job Type: </label>
        <select name="jobType" value={formData.jobType} onChange={handleChange}>
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Remote">Remote</option>
        </select>
        <br />
        <label>Location: </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <br />
        <label>Salary: </label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Create Job</button>
      </form>
    </div>
  )
}

export default CreateJob
