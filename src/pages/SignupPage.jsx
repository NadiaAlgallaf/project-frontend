import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signUp } from '../services/authService'


function Signup() {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConf: '',
    role: '',
    phone: '',
    companyLogo: ''
  })

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConf,
    role,
    phone,
    companyLogo
  } = formData

  function handleChange(event) {
    setError('')

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (password !== passwordConf) {
      setError('Passwords do not match.')
      return
    }

    if (role === 'Employer' && !companyLogo) {
      setError('Company logo URL is required for Employers.')
      return
    }

    try {
      setSubmitting(true)

      // Don't send passwordConf to the backend
      const { passwordConf, ...signupData } = formData

      await signUp(signupData)

      // Signup successful → go to Sign In
      navigate('/sign-in')
    } catch (err) {
      console.log('Sign up error:', err)

      setError(
        err?.response?.data?.message ||
          'Unable to create account. Please try again.'
      )

      setSubmitting(false)
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
    )

    if (basicFieldsInvalid) {
      return true
    }

    if (role === 'Employer' && !companyLogo) {
      return true
    }
    return false
  }
  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Create an Account</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="firstName">
                      First Name
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>

                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="phone">
                    Phone
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="role">
                    Role
                  </label>

                  <select
                    className="form-select"
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

                {role === 'Employer' && (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="companyLogo">
                      Company Logo URL
                    </label>

                    <input
                      className="form-control"
                      type="url"
                      id="companyLogo"
                      name="companyLogo"
                      value={companyLogo}
                      onChange={handleChange}
                      placeholder="https://example.com/logo.png"
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>

                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="confirm">
                    Confirm Password
                  </label>

                  <input
                    className="form-control"
                    type="password"
                    id="confirm"
                    name="passwordConf"
                    value={passwordConf}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={isFormInvalid() || submitting}
                >
                  {submitting ? 'Signing up...' : 'Sign Up'}
                </button>

                <p className="text-center mt-3">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate('/sign-in')}
                  >
                    Sign In
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signup