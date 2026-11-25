import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    matricula: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { nombre, matricula, email, password, confirmPassword } = formData;

    if (
      !nombre.trim() ||
      !matricula.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsSubmitting(true);
      await register({
        nombre: nombre.trim(),
        matricula: matricula.trim(),
        email: email.trim(),
        password,
      });
      setSuccess(
        "Cuenta creada exitosamente. Redirigiendo al inicio de sesión...",
      );
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.customMessage || "No se pudo completar el registro.");
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
              <span className="hero-pill">Comunidad UTR</span>
              <h1>Forma parte del juego.</h1>
              <p>
                Crea tu cuenta UTR y encuentra el equipo para entrenar, competir
                y compartir.
              </p>

              <ul className="hero-feature-list">
                <li>
                  <span className="hero-feature-dot">1</span>
                  <span>Explora material disponible en tiempo real</span>
                </li>
                <li>
                  <span className="hero-feature-dot">2</span>
                  <span>Solicita tu préstamo fácilmente por disciplina</span>
                </li>
                <li>
                  <span className="hero-feature-dot">3</span>
                  <span>Consulta tu historial y entregas pendientes</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="auth-card">
            <div className="auth-header">
              <h2>Crear cuenta</h2>
              <p className="auth-subtitle">
                Completa tus datos institucionales.
              </p>
            </div>

            <div className="role-info-banner">
              El rol asignado por defecto es <strong>USER</strong>.
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="alert-error">{error}</div>}
              {success && <div className="alert-success">{success}</div>}

              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="Ej. Mariana López García"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="matricula">Matrícula</label>
                  <input
                    id="matricula"
                    type="text"
                    name="matricula"
                    placeholder="UTR20260124"
                    value={formData.matricula}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="estudiante@utr.edu.mx"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar contraseña</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Crear Cuenta"}
              </button>
            </form>

            <div className="auth-footer">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
