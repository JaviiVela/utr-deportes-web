import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import SportItemIcon from "../components/SportItemIcon";
import "./Inventory.css";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeporte, setSelectedDeporte] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Modal B2
  const [selectedItem, setSelectedItem] = useState(null);
  const [loanForm, setLoanForm] = useState({
    cantidad: 1,
    canchaOActividad: "",
  });
  const [modalError, setModalError] = useState("");
  const [submittingLoan, setSubmittingLoan] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");
      const params = {};
      if (selectedDeporte) params.deporte = selectedDeporte;
      if (onlyAvailable) params.disponible = true;

      const { data } = await api.get("/api/sports/items", { params });
      const list = Array.isArray(data) ? data : data.items || [];
      setItems(list);
    } catch (err) {
      setError(
        err.customMessage || "No se pudo cargar el inventario deportivo.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [selectedDeporte, onlyAvailable]);

  // Filtro local por texto de búsqueda
  const filteredItems = items.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.nombre?.toLowerCase().includes(q) ||
      item.codigo?.toLowerCase().includes(q) ||
      item.deporte?.toLowerCase().includes(q)
    );
  });

  const totalUnitsAvailable = items.reduce(
    (acc, item) => acc + (Number(item.disponibles) || 0),
    0,
  );

  // Disciplinas únicas disponibles + base
  const disciplines = Array.from(
    new Set([
      "Fútbol",
      "Básquetbol",
      "Voleibol",
      "Atletismo",
      ...items.map((i) => i.deporte).filter(Boolean),
    ]),
  );

  // Handlers estandarizados
  const handleSelect = (item) => {
    setSelectedItem(item);
    setLoanForm({ cantidad: 1, canchaOActividad: "" });
    setModalError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityStep = (delta) => {
    if (!selectedItem) return;
    setLoanForm((prev) => {
      const next = Number(prev.cantidad) + delta;
      if (next < 1 || next > selectedItem.disponibles) return prev;
      return { ...prev, cantidad: next };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError("");

    const qty = Number(loanForm.cantidad);
    if (!qty || qty < 1 || qty > selectedItem.disponibles) {
      setModalError(
        `La cantidad debe estar entre 1 y ${selectedItem.disponibles} unidades.`,
      );
      return;
    }

    if (!loanForm.canchaOActividad.trim()) {
      setModalError(
        "Indica la cancha o actividad donde utilizarás el material.",
      );
      return;
    }

    try {
      setSubmittingLoan(true);
      await api.post("/api/sports/loans", {
        itemId: selectedItem.id,
        cantidad: qty,
        canchaOActividad: loanForm.canchaOActividad.trim(),
      });

      setSelectedItem(null);
      setSuccessMsg(`Préstamo registrado: ${qty}x ${selectedItem.nombre}.`);
      setTimeout(() => setSuccessMsg(""), 4000);
      fetchItems();
    } catch (err) {
      setModalError(
        err.customMessage || "Error al registrar la solicitud de préstamo.",
      );
    } finally {
      setSubmittingLoan(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="page-container">
        <div className="page-header-row">
          <div>
            <span className="section-kicker">Catálogo UTR</span>
            <h1>Encuentra tu próximo juego</h1>
            <p className="page-header-sub">
              Material disponible para préstamo en el campus.
            </p>
          </div>

          <div className="total-units-card">
            <span>Disponibles ahora</span>
            <strong>{totalUnitsAvailable} unidades</strong>
          </div>
        </div>

        {successMsg && (
          <div className="alert-success" style={{ marginBottom: "1rem" }}>
            {successMsg}
          </div>
        )}
        {error && (
          <div className="alert-error" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <section className="filters-bar">
          <div className="filters-left">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar material o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="filter-select-group">
              <label htmlFor="deporte-select">DISCIPLINA</label>
              <select
                id="deporte-select"
                className="filter-select"
                value={selectedDeporte}
                onChange={(e) => setSelectedDeporte(e.target.value)}
              >
                <option value="">Todas</option>
                {disciplines.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
              />
              <span>Solo disponibles</span>
            </label>
          </div>

          <span className="items-count-text">
            {filteredItems.length} artículos
          </span>
        </section>

        {loading ? (
          <p style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            Cargando inventario deportivo...
          </p>
        ) : filteredItems.length === 0 ? (
          <p style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
            No se encontraron artículos con los filtros actuales.
          </p>
        ) : (
          <section className="inventory-grid">
            {filteredItems.map((item, idx) => {
              const available = Number(item.disponibles) || 0;
              const statusClass = (item.estadoFisico || "BUENO").toLowerCase();

              return (
                <article key={item.id} className="item-card">
                  <div
                    className={`item-card-banner ${idx % 3 === 2 ? "mint" : ""}`}
                  >
                    <span className="item-code-tag">{item.codigo}</span>
                    <SportItemIcon
                      nombre={item.nombre}
                      deporte={item.deporte}
                    />
                  </div>

                  <div className="item-card-body">
                    <div>
                      <div className="item-title-row">
                        <h3>{item.nombre}</h3>
                        <span className={`status-badge ${statusClass}`}>
                          {item.estadoFisico || "BUENO"}
                        </span>
                      </div>
                      <p className="item-meta">{item.deporte}</p>
                    </div>

                    <div className="item-card-footer">
                      <span
                        className={`stock-text ${available === 0 ? "empty" : ""}`}
                      >
                        {available} disponibles
                      </span>
                      <button
                        type="button"
                        className="btn-request"
                        disabled={available <= 0}
                        onClick={() => handleSelect(item)}
                      >
                        Solicitar Préstamo
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>

      {/* Pantalla B2 — Modal Solicitar Préstamo */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-kicker">
                  {selectedItem.codigo} · {selectedItem.deporte}
                </span>
                <h2>Solicitar préstamo</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-summary-card">
              <div>
                <strong>{selectedItem.nombre}</strong>
                <span>Estado físico: {selectedItem.estadoFisico}</span>
              </div>
              <strong>Disponibles: {selectedItem.disponibles}</strong>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {modalError && <div className="alert-error">{modalError}</div>}

              <div className="form-group">
                <label>Cantidad</label>
                <div className="stepper-control">
                  <button
                    type="button"
                    className="stepper-btn"
                    disabled={Number(loanForm.cantidad) <= 1}
                    onClick={() => handleQuantityStep(-1)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    name="cantidad"
                    className="stepper-value"
                    min="1"
                    max={selectedItem.disponibles}
                    value={loanForm.cantidad}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="stepper-btn"
                    disabled={
                      Number(loanForm.cantidad) >= selectedItem.disponibles
                    }
                    onClick={() => handleQuantityStep(1)}
                  >
                    +
                  </button>
                </div>
                <span className="helper-hint">
                  Máximo {selectedItem.disponibles} unidades
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="canchaOActividad">Cancha o Actividad</label>
                <input
                  id="canchaOActividad"
                  type="text"
                  name="canchaOActividad"
                  placeholder="Ej. Cancha 2 - Torneo Interno"
                  value={loanForm.canchaOActividad}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSelectedItem(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ marginTop: 0 }}
                  disabled={submittingLoan}
                >
                  {submittingLoan ? "Confirmando..." : "Confirmar Préstamo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
