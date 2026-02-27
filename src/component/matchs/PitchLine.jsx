const PitchLine = ({ stroke = "rgba(255,255,255,0.9)" }) => (
  <svg
    viewBox="0 0 100 140"
    preserveAspectRatio="none"
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      // petit relief pour que la ligne “ressorte” sans être épaisse
      filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.18))",
    }}
  >
    {/* tout est en traits ronds = rendu plus "pro" */}
    <g fill="none" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      {/* contour */}
      <rect x="2" y="2" width="96" height="136" rx="1.5" />

      {/* ligne médiane */}
      <line x1="2" y1="70" x2="98" y2="70" />

      {/* rond central */}
      <circle cx="50" cy="70" r="9.5" />
      <circle cx="50" cy="70" r="0.9" fill={stroke} />

      {/* surface du haut */}
      <rect x="18" y="2" width="64" height="26" />
      <rect x="30" y="2" width="40" height="10" />
      <circle cx="50" cy="20" r="0.9" fill={stroke} />

      {/* arc (D) haut */}
      <path d="M 40 28 A 10 10 0 0 0 60 28" />

      {/* surface du bas */}
      <rect x="18" y="112" width="64" height="26" />
      <rect x="30" y="128" width="40" height="10" />
      <circle cx="50" cy="120" r="0.9" fill={stroke} />

      {/* arc (D) bas */}
      <path d="M 40 112 A 10 10 0 0 1 60 112" />

      {/* quarts de cercle corners */}
      <path d="M 2 8 A 6 6 0 0 1 8 2" />
      <path d="M 98 8 A 6 6 0 0 0 92 2" />
      <path d="M 2 132 A 6 6 0 0 0 8 138" />
      <path d="M 98 132 A 6 6 0 0 1 92 138" />
    </g>
  </svg>
);
export default PitchLine