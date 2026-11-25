import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(formData.email.trim(), formData.password);
      navigate("/inventario");
    } catch (err) {
      setError(err.customMessage || "Credenciales incorrectas.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <header className="auth-topbar">
        <div className="auth-brand">
          <div className="auth-logo-box">UTR</div>
          <div>
            <div className="auth-brand-title">
              UTR <span>| Deportes</span>
            </div>
            <span className="auth-brand-sub">Préstamo de material</span>
          </div>
        </div>
        <span className="guest-pill">Rol activo: Invitado</span>
      </header>

      <main className="auth-main">
        <div className="auth-split-grid">
          <section className="auth-hero-card">
            <div>
              <span className="hero-pill">Actívate en el campus</span>
              <h1>Todo el deporte, en tus manos.</h1>
              <p>
                Consulta el inventario, reserva material y disfruta cada
                actividad en la UTR.
              </p>
            </div>

            <div className="hero-stats-grid">
              <div className="hero-stat-box">
                <strong>6+</strong>
                <span>disciplinas</span>
              </div>
              <div className="hero-stat-box">
                <strong>24/7</strong>
                <span>inventario vivo</span>
              </div>
              <div className="hero-stat-box">
                <strong>UTR</strong>
                <span>comunidad</span>
              </div>
            </div>
          </section>

          <section className="auth-card">
            <div className="auth-icon-badge">→</div>
            <div className="auth-header">
              <h2>Bienvenido de vuelta</h2>
              <p className="auth-subtitle">
                Inicia sesión con tu cuenta institucional.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="alert-error">{error}</div>}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="alumno@equipo-b2.utr"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="auth-footer">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
