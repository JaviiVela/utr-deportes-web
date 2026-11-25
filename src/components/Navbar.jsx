import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <NavLink to="/inventario" className="navbar-brand">
          <div className="navbar-logo">UTR</div>
          <div className="navbar-title">
            UTR <span>| Deportes</span>
          </div>
        </NavLink>

        <nav className="navbar-links">
          <NavLink
            to="/inventario"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Inventario
          </NavLink>

          <NavLink
            to="/mis-prestamos"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Mis préstamos
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Panel Coordinación
            </NavLink>
          )}
        </nav>
      </div>

      <div className="navbar-right">
        <span className="user-role-info">
          {user?.nombre || "Usuario"} ·{" "}
          <span className={`role-badge-pill ${isAdmin ? "admin" : ""}`}>
            Rol activo: {user?.rol || "USER"}
          </span>
        </span>
        <button type="button" className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;
