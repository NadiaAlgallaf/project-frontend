import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createJob } from '../../services/jobService.js'
import { JOB_CATEGORIES, EMPLOYMENT_TYPES } from '../../constants/jobOptions.js'

function CreateJob() {
  const navigate = useNavigate()

  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    jobCategory: '',
    jobType: '',
    requirements: "",
    education: "",
    experience: "",
    location: '',
    salary: ''
  })

  function handleChange(event) {
    setError('')

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError('')

      await createJob(formData)

      navigate('/jobs')
    } catch (error) {
      console.log(error)

      setError(
        error?.response?.data?.message ||
        'Unable to create job. Please try again.'
      )
    }
  }

  return (
    <div className="container">
      <h1>Create Job</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea
            className="form-control"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
          />
        </div>

        <label className="form-label">Requirements:</label>

        <textarea
          className="form-control"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          required
        />

        <br />

        <label className="form-label">Education:</label>

        <input
          className="form-control"
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
        />

        <br />

        <label className="form-label">Experience:</label>

        <input
          className="form-control"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <br />

        <div className="mb-3">
          <label className="form-label">Job Category</label>
          <select
            className="form-select"
            name="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
          >
            <option value="">Select Job Category</option>

            {JOB_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Employment Type</label>
          <select
            className="form-select"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">Select Employment Type</option>

            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Job</button>
      </form>
    </div>
  )
}

export default CreateJob
