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
    <main className="jobs-page">
      <div className="container">
        <div className="jobs-header">
          <p className="jobs-small-title">FIND YOUR NEXT OPPORTUNITY</p>

          <h1>Explore Jobs</h1>

          <p>
            Browse available positions and find an opportunity that matches your
            goals.
          </p>
        </div>

        <form onSubmit={handleSearch} className="jobs-filter-card">
          <div className="row g-3">
            <div className="col-md-5">
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

            <div className="col-md-5">
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

            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </div>

          <button
            type="button"
            className="clear-filter-btn"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </form>

        <div className="jobs-results-header">
          <h4>Available Jobs</h4>
          <span>{jobs.length} jobs found</span>
        </div>

        {jobs.length === 0 ? (
          <div className="no-jobs-card">
            <i className="bi bi-search"></i>
            <h4>No jobs found</h4>
            <p>Try changing your filters to see more opportunities.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-card-body">
                <div className="job-main-content">
                  {job.createdBy?.companyLogo && (
                    <img
                      src={job.createdBy.companyLogo}
                      alt={`${job.companyName} logo`}
                      className="job-company-logo"
                    />
                  )}

                  <div>
                    <h2>{job.jobTitle}</h2>

                    <p className="job-company-name">{job.companyName}</p>

                    <div className="job-badges">
                      <span className="badge text-bg-light">
                        {job.jobCategory}
                      </span>

                      <span className="badge job-type-badge">
                        {job.jobType}
                      </span>
                    </div>

                    <div className="job-info">
                      <span>
                        <i className="bi bi-geo-alt"></i>
                        {job.location}
                      </span>

                      <span>
                        <i className="bi bi-cash"></i>
                        {job.salary} BHD
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/jobs/${job._id}`}
                  className="btn btn-outline-primary job-details-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

export default AllJobs
