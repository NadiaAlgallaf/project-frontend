
import { useState, useEffect } from "react";
import { getAllJobs } from "../../services/jobService.js";
import { Link } from "react-router";
import {
  JOB_CATEGORIES,
  EMPLOYMENT_TYPES,
} from "../../constants/jobOptions.js";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    jobCategory: "",
    jobType: "",
  });

  async function loadJobs(searchFilters = {}) {
    try {
      setLoading(true);
      setError("");

      const data = await getAllJobs(searchFilters);

      setJobs(data);
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Unable to load jobs."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  function handleFilterChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  }

  function handleSearch(event) {
    event.preventDefault();

    const searchFilters = {};

    if (filters.jobCategory) {
      searchFilters.jobCategory = filters.jobCategory;
    }

    if (filters.jobType) {
      searchFilters.jobType = filters.jobType;
    }

    loadJobs(searchFilters);
  }

  function handleClearFilters() {
    setFilters({
      jobCategory: "",
      jobType: "",
    });

    loadJobs();
  }

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>Unable to load jobs</h2>
        <p>{error}</p>

        <button onClick={() => loadJobs(filters)}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>All Jobs</h1>

      <form onSubmit={handleSearch}>
        <div>
          <label>Job Category: </label>

          <select
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

        <br />

        <div>
          <label>Employment Type: </label>

          <select
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

        <br />

        <button type="submit">
          Search Jobs
        </button>

        <button
          type="button"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </form>

      <br />

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id}>
  {job.createdBy?.companyLogo && (
    <img
      src={job.createdBy.companyLogo}
      alt={`${job.companyName} logo`}
      width="100"
      height="100"
    />
  )}

            <h2>{job.jobTitle}</h2>

            <p>{job.companyName}</p>

            <p>{job.jobCategory}</p>

            <p>{job.jobType}</p>

            <p>{job.location}</p>

            <p>{job.salary}</p>

            <Link to={`/jobs/${job._id}`}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default AllJobs;
