import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PitchLine from "./PitchLine";

// Helpers
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const initials = (name = "") => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const groupByLine = (players) => {
  const map = { GK: [], DEF: [], MID: [], FWD: [] };
  players.forEach((p) => {
    const pos = p.position || "MID";
    if (map[pos]) map[pos].push(p);
    else map.MID.push(p);
  });
  return map;
};

const spreadX = (count) => {
  if (count <= 1) return [50];
  const step = 70 / (count - 1);
  return Array.from({ length: count }, (_, i) => 15 + i * step);
};

const defaultY = { FWD: 22, MID: 45, DEF: 68, GK: 88 };

const PlayerDot = ({ player, x, y, color, onClick, badges = [] }) => {
  const size = 44;

  return (
    <button
      type="button"
      onClick={onClick}
      title={player.playerName}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        width: size,
        height: size,
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.9)",
        background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), rgba(255,255,255,0) 45%), ${color}`,
        color: "white",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 10px 22px rgba(0,0,0,0.30)",
        cursor: "pointer",
        padding: 0,
        outline: "none",
      }}
      onMouseDown={(e) =>
        (e.currentTarget.style.transform = "translate(-50%, -50%) scale(0.98)")
      }
      onMouseUp={(e) =>
        (e.currentTarget.style.transform = "translate(-50%, -50%)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translate(-50%, -50%)")
      }
      onFocus={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 0 0 4px rgba(255,255,255,0.25), 0 10px 22px rgba(0,0,0,0.30)")
      }
      onBlur={(e) =>
        (e.currentTarget.style.boxShadow = "0 10px 22px rgba(0,0,0,0.30)")
      }
    >
      {/* Ombre au sol */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: -10,
          left: "50%",
          width: 34,
          height: 12,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.35), rgba(0,0,0,0) 70%)",
          filter: "blur(0.2px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          lineHeight: 1,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 0.2 }}>
          {player.number ? player.number : initials(player.playerName)}
        </div>
        <div
          style={{
            fontSize: 9,
            opacity: 0.95,
            maxWidth: 60,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {player.shortName || player.playerName?.split(" ").slice(-1)[0]}
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div
          style={{
            position: "absolute",
            right: -6,
            top: -6,
            display: "flex",
            gap: 4,
            zIndex: 2,
          }}
        >
          {badges.map((b, idx) => (
            <span
              key={idx}
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: b.bg || "white",
                border: "1px solid rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
              }}
              title={b.title}
            >
              {b.icon || ""}
            </span>
          ))}
        </div>
      )}
    </button>
  );
};

const Pitch = ({
  players = [],
  teamColor = "#1E90FF",
  events = [],
  showBadges = true,
}) => {
  const navigate = useNavigate();

  const badgesByPlayer = useMemo(() => {
    if (!showBadges) return new Map();
    const map = new Map();
    const addBadge = (pid, badge) => {
      if (!pid) return;
      const arr = map.get(pid) || [];
      arr.push(badge);
      map.set(pid, arr);
    };

    events.forEach((e) => {
      if (e.eventType === "GOAL" || e.eventType === "PENALTY_GOAL") {
        addBadge(e.playerId, { icon: "⚽", title: "But" });
      }
      if (e.eventType === "YELLOW_CARD")
        addBadge(e.playerId, { bg: "#f7d21a", title: "Carton jaune" });
      if (e.eventType === "RED_CARD")
        addBadge(e.playerId, { bg: "#e63b2e", title: "Carton rouge" });
    });

    return map;
  }, [events, showBadges]);

  const placed = useMemo(() => {
    const lines = groupByLine(players);
    ["GK", "DEF", "MID", "FWD"].forEach((k) => {
      lines[k].sort((a, b) => (a.number ?? 99) - (b.number ?? 99));
    });

    const out = [];
    Object.entries(lines).forEach(([pos, arr]) => {
      const y = defaultY[pos] ?? 50;
      const xs = spreadX(arr.length);
      arr.forEach((p, i) => out.push({ player: p, x: xs[i], y }));
    });

    return out.map((o, idx) => ({
      ...o,
      x: clamp(o.x + (idx % 2 === 0 ? -1.5 : 1.5), 8, 92),
    }));
  }, [players]);

  const line = "rgba(255,255,255,0.88)";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 430,
        aspectRatio: "5 / 7",
        margin: "0 auto",
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow: "0 18px 45px rgba(0,0,0,0.30)",
        background: `
          radial-gradient(120% 80% at 50% 20%, rgba(255,255,255,0.14), rgba(255,255,255,0) 45%),
          radial-gradient(120% 90% at 50% 110%, rgba(0,0,0,0.28), rgba(0,0,0,0) 55%),
          linear-gradient(180deg, rgba(60,179,113,1) 0%, rgba(45,155,96,1) 100%)
        `,
      }}
    >
      {/* Grain subtil (texture) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 3px)",
          mixBlendMode: "overlay",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      {/* Bandes gazon */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.055) 0, rgba(255,255,255,0.055) 54px, rgba(0,0,0,0) 54px, rgba(0,0,0,0) 108px)",
          opacity: 0.9,
          pointerEvents: "none",
        }}
      />
      <PitchLine stroke="rgba(255,255,255,0.9)" />

      {/* Vignettage pour profondeur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow:
            "inset 0 0 0 2px rgba(255,255,255,0.18), inset 0 28px 60px rgba(0,0,0,0.18), inset 0 -28px 60px rgba(0,0,0,0.22)",
          pointerEvents: "none",
        }}
      />

      {/* Ligne médiane */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: "100%",
          borderTop: `2px solid ${line}`,
          filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.15))",
        }}
      />

      {/* Cercle central */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "26%",
          height: "18%",
          transform: "translate(-50%, -50%)",
          border: `2px solid ${line}`,
          borderRadius: "50%",
          filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.15))",
        }}
      />

      {/* Surfaces haut */}
      <div
        style={{
          position: "absolute",
          left: "18%",
          top: 0,
          width: "64%",
          height: "18%",
          border: `2px solid ${line}`,
          borderBottom: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "30%",
          top: 0,
          width: "40%",
          height: "7%",
          border: `2px solid ${line}`,
          borderBottom: "none",
        }}
      />

      {/* Arc surface haut */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: "22%",
          height: "14%",
          transform: "translate(-50%, -50%)",
          border: `2px solid ${line}`,
          borderBottom: "none",
          borderLeft: "none",
          borderRight: "none",
          borderRadius: "0 0 999px 999px",
          opacity: 0.95,
        }}
      />

      {/* Surfaces bas */}
      <div
        style={{
          position: "absolute",
          left: "18%",
          bottom: 0,
          width: "64%",
          height: "18%",
          border: `2px solid ${line}`,
          borderTop: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "30%",
          bottom: 0,
          width: "40%",
          height: "7%",
          border: `2px solid ${line}`,
          borderTop: "none",
        }}
      />

      {/* Arc surface bas */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "18%",
          width: "22%",
          height: "14%",
          transform: "translate(-50%, 50%)",
          border: `2px solid ${line}`,
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderRadius: "999px 999px 0 0",
          opacity: 0.95,
        }}
      />

      {/* Points de penalty */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "12%",
          width: 6,
          height: 6,
          transform: "translate(-50%, -50%)",
          borderRadius: 999,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.20)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "12%",
          width: 6,
          height: 6,
          transform: "translate(-50%, 50%)",
          borderRadius: 999,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.20)",
        }}
      />

      {/* Joueurs */}
      {placed.map(({ player, x, y }) => (
        <PlayerDot
          key={player.playerId}
          player={player}
          x={x}
          y={y}
          color={teamColor}
          badges={badgesByPlayer.get(player.playerId) || []}
          onClick={() =>
            navigate(`/joueurs/${player.clubId}/${player.playerId}`)
          }
        />
      ))}
    </div>
  );
};

export default Pitch;
