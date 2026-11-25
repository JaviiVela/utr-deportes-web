import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Inventory.css";
import "./MyLoans.css";

const MyLoansPage = () => {
  const [loans, setLoans] = useState([]);
  const [activeTab, setActiveTab] = useState("ACTIVO");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchMyLoans = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/api/sports/loans");
      const list = Array.isArray(data) ? data : data.loans || [];
      setLoans(list);
    } catch (err) {
      setError(err.customMessage || "No se pudieron cargar tus préstamos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLoans();
  }, []);

  const formatDateTime = (isoString) => {
    if (!isoString) return "Reciente";
    const date = new Date(isoString);
    return date.toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const activeLoans = loans.filter((l) => l.estatus === "ACTIVO");
  const finishedLoans = loans.filter((l) => l.estatus !== "ACTIVO");

  return (
    <div>
      <Navbar />

      <main className="page-container">
        <div className="loans-header-actions">
          <div>
            <span className="section-kicker">Tu Actividad</span>
            <h1>Mis préstamos</h1>
            <p className="page-header-sub">
              Consulta el estado y los detalles de tu material.
            </p>
          </div>

          <button
            type="button"
            className="btn-new-loan"
            onClick={() => navigate("/inventario")}
          >
            + Nuevo préstamo
          </button>
        </div>

        {error && (
          <div className="alert-error" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <div className="tabs-row">
          <button
            type="button"
            className={`tab-btn ${activeTab === "ACTIVO" ? "active" : ""}`}
            onClick={() => setActiveTab("ACTIVO")}
          >
            <span>Activos</span>
            <span className="tab-count-pill">{activeLoans.length}</span>
          </button>

          <button
            type="button"
            className={`tab-btn ${activeTab === "HISTORIAL" ? "active" : ""}`}
            onClick={() => setActiveTab("HISTORIAL")}
          >
            <span>Historial</span>
            <span className="tab-count-pill">{finishedLoans.length}</span>
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            Cargando historial de préstamos...
          </p>
        ) : activeTab === "ACTIVO" ? (
          activeLoans.length === 0 ? (
            <p
              style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}
            >
              No tienes préstamos activos en este momento.
            </p>
          ) : (
            <section className="active-loans-grid">
              {activeLoans.map((loan) => {
                const id = loan.loanId ?? loan.id;
                const itemName =
                  typeof loan.item === "object" ? loan.item?.nombre : loan.item;

                return (
                  <article key={id} className="loan-card">
                    <div className="loan-card-top">
                      <div>
                        <span className="modal-kicker">FOLIO #{id}</span>
                        <h3>{itemName || "Material deportivo"}</h3>
                      </div>
                      <span className="loan-status-pill">ACTIVO</span>
                    </div>

                    <div className="loan-meta-grid">
                      <div className="loan-meta-item">
                        <span>Cantidad</span>
                        <strong>{loan.cantidad}</strong>
                      </div>
                      <div className="loan-meta-item">
                        <span>Cancha / actividad</span>
                        <strong>
                          {loan.canchaOActividad || "Uso en campus"}
                        </strong>
                      </div>
                      <div className="loan-meta-item">
                        <span>Hora de salida</span>
                        <strong>{formatDateTime(loan.horaSalida)}</strong>
                      </div>
                    </div>

                    <div className="loan-pending-banner">
                      Entrega pendiente en Coordinación Deportiva
                    </div>
                  </article>
                );
              })}
            </section>
          )
        ) : finishedLoans.length === 0 ? (
          <p style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            Aún no tienes préstamos finalizados en tu historial.
          </p>
        ) : (
          <section className="history-list">
            {finishedLoans.map((loan) => {
              const id = loan.loanId ?? loan.id;
              const itemName =
                typeof loan.item === "object" ? loan.item?.nombre : loan.item;

              return (
                <article key={id} className="history-row-card">
                  <div>
                    <h4>{itemName || "Material deportivo"}</h4>
                    <p>
                      Cantidad {loan.cantidad} ·{" "}
                      {loan.canchaOActividad || "Campus UTR"} ·{" "}
                      {formatDateTime(loan.horaSalida)}
                    </p>
                  </div>
                  <span className="loan-status-pill finalizado">
                    {loan.estatus || "FINALIZADO"}
                  </span>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
};

export default MyLoansPage;
