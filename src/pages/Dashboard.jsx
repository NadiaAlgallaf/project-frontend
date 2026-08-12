import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router'

function Dashboard() {
  const { user, logout } = useAuth()

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <p className="dashboard-small-title">MY DASHBOARD</p>

          <h1>
            Welcome, {user.firstName} {user.lastName}
          </h1>

          <p>Manage your CareerConnect account and activities.</p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-user">
            <div className="dashboard-icon">
              <i className="bi bi-person"></i>
            </div>

            <div>
              <h3>
                {user.firstName} {user.lastName}
              </h3>

              <p>{user.email}</p>

              <span className="dashboard-role">{user.role}</span>
            </div>
          </div>

          <hr />

          {user.role === 'Employer' && (
            <div className="dashboard-actions">
              <h4>Employer Dashboard</h4>

              <p>
                Post new opportunities and manage your existing job listings.
              </p>

              <Link className="btn btn-primary me-2" to="/jobs/create">
                <i className="bi bi-plus-circle me-2"></i>
                Post a Job
              </Link>

              <Link className="btn btn-outline-primary" to="/my-jobs">
                <i className="bi bi-briefcase me-2"></i>
                My Jobs
              </Link>
            </div>
          )}

          {user.role === 'JobSeeker' && (
            <div className="dashboard-actions">
              <h4>Job Seeker Dashboard</h4>

              <p>Explore available jobs and keep track of your applications.</p>

              <Link className="btn btn-primary me-2" to="/jobs">
                <i className="bi bi-search me-2"></i>
                Browse Jobs
              </Link>

              <Link className="btn btn-outline-primary" to="/my-applications">
                <i className="bi bi-file-earmark-text me-2"></i>
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
