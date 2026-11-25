import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="auth-container">
      <div className="auth-card forbidden-card">
        <div className="forbidden-badge">403</div>
        <h2>Acceso Restringido</h2>
        <p className="auth-subtitle">
          Tu sesión actual tiene rol <strong>{user?.rol || "USER"}</strong>.
          Esta sección es exclusiva para administradores de Coordinación
          Deportiva.
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("/inventario")}
        >
          Volver al Inventario Deportivo
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
