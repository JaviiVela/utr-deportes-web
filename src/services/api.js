import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Interceptor de salida: inyecta el Doble JWT en cada petición
api.interceptors.request.use(
  (config) => {
    const appToken = import.meta.env.VITE_API_APP_TOKEN;
    if (appToken) {
      config.headers["x-api-token"] = appToken;
    }

    const userToken = localStorage.getItem("token");
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Interceptor de entrada: manejo centralizado de errores HTTP (401, 403, 404, 500)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    if (status === 401 && !requestUrl.includes("/auth/login")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    if (status === 403) {
      error.customMessage =
        error.response?.data?.message ||
        "Acceso restringido: no tienes permisos para realizar esta acción.";
    } else if (status === 404) {
      error.customMessage =
        error.response?.data?.message ||
        "El recurso solicitado no fue encontrado.";
    } else if (status >= 500) {
      error.customMessage =
        "Error interno en el servidor. Intenta nuevamente en unos momentos.";
    } else {
      error.customMessage =
        error.response?.data?.message ||
        "Ocurrió un error al procesar la solicitud.";
    }

    return Promise.reject(error);
  },
);

export default api;
