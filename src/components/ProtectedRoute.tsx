import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  role: "ADMIN" | "STUDENT";
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const token = sessionStorage.getItem("token");
  const userString = sessionStorage.getItem("user");

  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userString);

    if (user.role !== role) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } catch {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;