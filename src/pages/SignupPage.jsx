import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: "",
    role: "",
    phone: "",
  });

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConf,
    role,
    phone,
  } = formData;

  function handleChange(event) {
    setError("");

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== passwordConf) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);

      // Don't send passwordConf to the backend
      const { passwordConf, ...signupData } = formData;

      await signUp(signupData);

      // Signup successful → go to Sign In
      navigate("/sign-in");
    } catch (err) {
      console.log("Sign up error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to create account. Please try again."
      );

      setSubmitting(false);
    }
  }

  function isFormInvalid() {
    return !(
      firstName &&
      lastName &&
      email &&
      password &&
      passwordConf &&
      role &&
      password === passwordConf
    );
  }

  return (
    <main>
      <h1>Sign Up</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>

          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name: </label>

          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone: </label>

          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="role">Role: </label>

          <select
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="JobSeeker">Job Seeker</option>
            <option value="Employer">Employer</option>
          </select>
        </div>

        <div>
          <label htmlFor="password">Password:</label>

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="confirm">Confirm Password:</label>

          <input
            type="password"
            id="confirm"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isFormInvalid() || submitting}
          >
            {submitting ? "Signing up..." : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default Signup;