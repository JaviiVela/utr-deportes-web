const SportItemIcon = ({ nombre = "", deporte = "" }) => {
  const n = nombre.toLowerCase();
  const d = deporte.toLowerCase();

  // 1. Cronómetro
  if (
    n.includes("cronómetro") ||
    n.includes("cronometro") ||
    n.includes("reloj")
  ) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="13" r="8" fill="#ffffff" />
        <path d="M12 9v4l2.5 2.5" stroke="#c81e1e" strokeWidth="2.1" />
        <path d="M9.5 2h5" />
        <path d="M12 2v3" />
        <path d="M18.5 6.5l1.5-1.5" />
      </svg>
    );
  }

  // 2. Silbato
  if (n.includes("silbato")) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 11h11a4 4 0 1 1-3.4 6.1L9 15H4v-4z" fill="#ffffff" />
        <circle cx="15" cy="14" r="1.5" fill="#c81e1e" stroke="none" />
        <path d="M18 9l2-2" stroke="#c81e1e" />
        <path d="M15 7V5" stroke="#c81e1e" />
      </svg>
    );
  }

  // 3. Conos de entrenamiento
  if (n.includes("cono")) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3L6.5 19h11L12 3z" fill="#c81e1e" />
        <path d="M8.2 14h7.6" stroke="#ffffff" strokeWidth="2.2" />
        <path d="M4 19h16" strokeWidth="2.2" />
      </svg>
    );
  }

  // 4. Petos deportivos
  if (n.includes("peto") || n.includes("camiseta") || n.includes("casaca")) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3l2 3h4l2-3 3 2-1.5 5v11h-11V10L5 5l3-2z" fill="#ffffff" />
        <path d="M8.5 12h7" stroke="#c81e1e" strokeWidth="2.2" />
      </svg>
    );
  }

  // 5. Bate de béisbol
  if (n.includes("bate")) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M17.5 3.5c1.2 1.2 1.5 3 .5 4.3L8.5 18.5l-2 2-2-2 2-2L17.2 7c.5-.6.4-1.5-.2-2.1-.6-.6-1.5-.7-2.1-.2l-1.4 1.2"
          fill="#ffffff"
        />
        <path d="M6.5 16.5l2 2" stroke="#c81e1e" strokeWidth="2.2" />
      </svg>
    );
  }

  // 6. Guante o pelota de béisbol
  if (n.includes("guante") || d.includes("béisbol") || d.includes("beisbol")) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8.5" fill="#ffffff" />
        <path
          d="M7.5 6.5c2 3.2 2 7.8 0 11"
          stroke="#c81e1e"
          strokeWidth="1.8"
          strokeDasharray="2 1.5"
        />
        <path
          d="M16.5 6.5c-2 3.2-2 7.8 0 11"
          stroke="#c81e1e"
          strokeWidth="1.8"
          strokeDasharray="2 1.5"
        />
      </svg>
    );
  }

  // 7. Balón de Básquetbol
  if (
    n.includes("básquet") ||
    n.includes("basquet") ||
    d.includes("básquet") ||
    d.includes("basquet")
  ) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8.5" fill="#ea580c" />
        <path d="M3.5 12h17M12 3.5v17" stroke="#0f294a" strokeWidth="1.6" />
        <path
          d="M6.2 6.2c3.2 3.2 3.2 8.4 0 11.6M17.8 6.2c-3.2 3.2-3.2 8.4 0 11.6"
          stroke="#0f294a"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  // 8. Balón de Voleibol
  if (n.includes("volei") || d.includes("volei")) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8.5" fill="#ffffff" />
        <path d="M12 12V3.5" />
        <path d="M12 12l7.4 4.2" />
        <path d="M12 12L4.6 16.2" />
        <path d="M7.5 5.2c2.5 1.8 4.2 4.3 4.5 6.8" stroke="#c81e1e" />
        <path d="M18.8 10.5c-2.6 1.2-4.8 1.5-6.8 1.5" stroke="#c81e1e" />
      </svg>
    );
  }

  // 9. Raqueta (Bádminton / Tenis)
  if (n.includes("raqueta") || d.includes("bádminton") || d.includes("tenis")) {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f294a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse
          cx="14.5"
          cy="9.5"
          rx="5"
          ry="6"
          transform="rotate(45 14.5 9.5)"
          fill="#ffffff"
        />
        <path d="M10.5 13.5L4.5 19.5" stroke="#c81e1e" strokeWidth="2.5" />
        <path d="M12 7l5 5M17 7l-5 5" stroke="#94a3b8" strokeWidth="1.2" />
      </svg>
    );
  }

  // 10. Balón de Fútbol (Default / Fútbol)
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0f294a"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8.5" fill="#ffffff" />
      <polygon
        points="12,8.5 15.2,10.8 14,14.5 10,14.5 8.8,10.8"
        fill="#0f294a"
      />
      <path d="M12 8.5V3.8M15.2 10.8l4.5-1.5M14 14.5l2.8 3.8M10 14.5l-2.8 3.8M8.8 10.8L4.3 9.3" />
    </svg>
  );
};

export default SportItemIcon;
