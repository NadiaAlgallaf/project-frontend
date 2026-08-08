import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user } = useAuth()
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/jobs">Jobs</Link>

      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>

          {/* JobSeeker pages         */}
          {/* {user.role === 'JobSeeker' && (

          )} */}

          {/* Employer pages */}
          {user.role === 'Employer' && (
            <>
              <Link to="/jobs/create">Post a Job</Link>
            </>
          )}
          <button onClick={logout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
