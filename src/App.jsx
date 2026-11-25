import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InventoryPage from "./pages/InventoryPage";
import MyLoansPage from "./pages/MyLoansPage";

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
                <InventoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mis-prestamos"
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <MyLoansPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <div style={{ padding: "2rem" }}>
                  Panel Exclusivo ADMIN (Siguiente bloque)
                </div>
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
