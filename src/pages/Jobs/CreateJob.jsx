import { useState } from "react";
import { useNavigate } from "react-router";
import { createJob } from "../../services/jobService.js";
import { JOB_CATEGORIES, EMPLOYMENT_TYPES } from "../../constants/jobOptions.js";

function CreateJob() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobCategory:"",
    jobType: "",
    location: "",
    salary: "",
  });

  function handleChange(event) {
    setError("");

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      await createJob(formData);

      navigate("/jobs");
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Unable to create job. Please try again."
      );
    }
  }

  return (
    <div>
      <h1>Create Job</h1>

      {error && <p className="error">{error}</p>}

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

       <label>Job Category: </label>
<select
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

    <select
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
  );
}

export default CreateJob;