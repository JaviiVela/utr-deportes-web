import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ForbiddenPage from "../pages/ForbiddenPage";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Cargando sesión...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <ForbiddenPage />;
  }

  return children;
};

export default ProtectedRoute;
