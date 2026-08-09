import { useState, useEffect } from "react";
import { getAllJobs } from "../../services/jobService.js";
import { Link } from "react-router";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadJobs() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllJobs();

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

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>Unable to load jobs</h2>
        <p>{error}</p>

        <button onClick={loadJobs}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>All Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available right now.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id}>
            <h2>{job.jobTitle}</h2>

            <p>{job.companyName}</p>

            <p>{job.location}</p>

            <p>{job.jobType}</p>

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