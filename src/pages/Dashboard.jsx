import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>
        Welcome {user.firstName} {user.lastName}
      </h1>

      <p>Email: {user.email}</p>

      <p>Role: {user.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;