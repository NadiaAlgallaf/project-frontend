import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function EmployerRoute({ children }) {
  const { loading, user } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user.role !== "Employer") {
    return <Navigate to="/jobs" replace />;
  }

  return children;
}

export default EmployerRoute;