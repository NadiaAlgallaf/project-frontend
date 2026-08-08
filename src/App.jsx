import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";

import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";

import AllJobs from "./pages/Jobs/AllJobs";
import JobDetails from "./pages/Jobs/JobDetails";
import CreateJob from "./pages/Jobs/CreateJob";
import EditJob from "./pages/Jobs/EditJob";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />

        <Route path="/sign-up" element={<SignupPage />} />

        <Route path="/sign-in" element={<SignInPage />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Public Job routes */}
        <Route path="/jobs" element={<AllJobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Protected Job routes */}
        <Route
          path="/jobs/create"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;