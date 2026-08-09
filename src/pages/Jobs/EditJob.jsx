import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getJob, updateJob } from "../../services/jobService.js";
import { useAuth } from "../../context/AuthContext";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobType: "",
    location: "",
    salary: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadJob() {
    try {
      const job = await getJob(id);

      const isOwner =
        user &&
        job.createdBy &&
        job.createdBy.toString() === user._id.toString();

      if (!isOwner) {
        navigate("/jobs");
        return;
      }

      setFormData({
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        jobDescription: job.jobDescription,
        jobType: job.jobType,
        location: job.location,
        salary: job.salary,
      });
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Unable to load this job."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      loadJob();
    }
  }, [id, user]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await updateJob(id, formData);

      navigate(`/jobs/${id}`);
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Unable to update this job."
      );
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Job</h1>

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

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
        >
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditJob;