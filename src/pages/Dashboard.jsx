import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router'

function Dashboard() {
  const { user, logout } = useAuth()

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <main className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1>
            Welcome {user.firstName} {user.lastName}
          </h1>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          <hr />

          {user.role === 'Employer' && (
            <div>
              <h4>Employer Dashboard</h4>

              <Link className="btn btn-primary me-2" to="/jobs/create">
                Post a Job
              </Link>

              <Link className="btn btn-outline-primary" to="/my-jobs">
                My Jobs
              </Link>
            </div>
          )}

          {user.role === 'JobSeeker' && (
            <div>
              <h4>Job Seeker Dashboard</h4>

              <Link className="btn btn-primary me-2" to="/jobs">
                Browse Jobs
              </Link>

              <Link className="btn btn-outline-primary" to="/my-applications">
                My Applications
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Dashboard
