import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

function Navbar() {
  const { logout, user } = useAuth()
  return (
    <nav className="navbar navbar-expand-lg career-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="CareerConnect Logo" className="navbar-logo" />
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>

          {user ? (
            <>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>

              {user.role === 'JobSeeker' && (
                <Link className="nav-link" to="/my-applications">
                  My Job Applications
                </Link>
              )}

              {user.role === 'Employer' && (
                <>
                  <Link className="nav-link" to="/jobs/create">
                    Post a Job
                  </Link>

                  <Link className="nav-link" to="/my-jobs">
                    My Jobs
                  </Link>
                </>
              )}

              <button className="btn btn-outline-primary" onClick={logout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/sign-up">
                Sign Up
              </Link>

              <Link className="nav-link" to="/sign-in">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
