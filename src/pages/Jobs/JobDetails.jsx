import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getJob, deleteJob } from "../../services/jobService.js";
import { useAuth } from "../../context/AuthContext";

function JobDetails() {
  const [job, setJob] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  async function loadJob() {
    try {
      const data = await getJob(id);
      setJob(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadJob();
  }, [id]);

  if (!job) {
    return <p>Loading...</p>;
  }

  async function handleDelete() {
    try {
      await deleteJob(id);
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  }

  // Check whether the logged-in user owns this job
  const isOwner =
    user &&
    job.createdBy &&
    job.createdBy.toString() === user._id.toString();

  return (
    <div>
      <h1>{job.jobTitle}</h1>

      <p>Company: {job.companyName}</p>

      <p>Location: {job.location}</p>

      <p>Type: {job.jobType}</p>

      <p>Salary: {job.salary}</p>

      <h3>Description</h3>

      <p>{job.jobDescription}</p>

      {isOwner && (
        <div>
          <Link to={`/jobs/${job._id}/edit`}> Edit</Link>

          <button onClick={handleDelete}> Delete</button>
        </div>
      )}
    </div>
  );
}

export default JobDetails;