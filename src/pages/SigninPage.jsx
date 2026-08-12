import { useState } from 'react'
import { useNavigate } from 'react-router'

import { signIn } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const SignInForm = () => {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError('')

      const signedInUser = await signIn(formData)

      setUser(signedInUser)

      navigate('/dashboard')
    } catch (err) {
      console.log('Sign in error:', err)

      setError(
        err?.response?.data?.message ||
          'Unable to sign in. Please check your email and password.'
      )
    }
  }

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign In</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email:
                  </label>

                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>

                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Sign In
                </button>

                <button
                  className="btn btn-outline-secondary w-100 mt-2"
                  type="button"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignInForm
