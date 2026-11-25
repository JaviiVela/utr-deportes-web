import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Vista temporal para validar sesión y prueba de rol 403
const TempDashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: "2rem" }}>
      <h2>
        Sesión activa: {user?.nombre} ({user?.rol})
      </h2>
      <p>Siguiente paso: construir Pantalla B1 (Inventario Deportivo).</p>
      <button
        onClick={logout}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          background: "#dc2626",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/inventario"
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <TempDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <div style={{ padding: "2rem" }}>Panel Exclusivo ADMIN</div>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
