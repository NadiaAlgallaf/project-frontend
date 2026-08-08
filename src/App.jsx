import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import SignupPage from './pages/SignupPage'
import Homepage from './pages/Homepage'
import SignInPage from './pages/SigninPage'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import { getCurrentUser, logout } from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import AllJobs from './pages/Jobs/AllJobs'
import JobDetails from './pages/Jobs/JobDetails'
import CreateJob from './pages/Jobs/CreateJob'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/jobs" element={<AllJobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route
          path="/jobs/create"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
