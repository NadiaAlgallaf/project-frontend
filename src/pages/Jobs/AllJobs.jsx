import { useState, useEffect } from 'react'
import { getAllJobs } from '../../services/jobService.js'
import { Link } from 'react-router'
import { JOB_CATEGORIES, EMPLOYMENT_TYPES } from '../../constants/jobOptions.js'

function AllJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [filters, setFilters] = useState({
    jobCategory: '',
    jobType: ''
  })

  async function loadJobs(searchFilters = {}) {
    try {
      setLoading(true)
      setError('')

      const data = await getAllJobs(searchFilters)

      setJobs(data)
    } catch (error) {
      console.log(error)

      setError(error?.response?.data?.message || 'Unable to load jobs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  function handleFilterChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    })
  }

  function handleSearch(event) {
    event.preventDefault()

    const searchFilters = {}

    if (filters.jobCategory) {
      searchFilters.jobCategory = filters.jobCategory
    }

    if (filters.jobType) {
      searchFilters.jobType = filters.jobType
    }

    loadJobs(searchFilters)
  }

  function handleClearFilters() {
    setFilters({
      jobCategory: '',
      jobType: ''
    })

    loadJobs()
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading jobs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h2>Unable to load jobs</h2>

        <p>{error}</p>

        <button className="btn btn-primary" onClick={() => loadJobs(filters)}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Jobs</h1>

      <form onSubmit={handleSearch} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Job Category</label>

          <select
            className="form-select"
            name="jobCategory"
            value={filters.jobCategory}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>

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
            value={filters.jobType}
            onChange={handleFilterChange}
          >
            <option value="">All Employment Types</option>

            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Search Jobs
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </form>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div className="card mb-3" key={job._id}>
            <div className="card-body">
              {job.createdBy?.companyLogo && (
                <img
                  src={job.createdBy.companyLogo}
                  alt={`${job.companyName} logo`}
                  width="80"
                  height="80"
                  className="mb-3 rounded"
                />
              )}

              <h2 className="card-title">{job.jobTitle}</h2>

              <p className="card-text">{job.companyName}</p>

              <div className="mb-3">
                <span className="badge text-bg-light me-2">
                  {job.jobCategory}
                </span>

                <span className="badge text-bg-primary">{job.jobType}</span>
              </div>

              <p className="card-text">{job.location}</p>

              <p className="card-text">{job.salary}</p>

              <Link to={`/jobs/${job._id}`} className="btn btn-outline-primary">
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AllJobs
