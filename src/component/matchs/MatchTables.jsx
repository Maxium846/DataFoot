import React from "react";
import { useNavigate } from "react-router-dom";

const MatchTables = ({ journee, matches, onScoreChange }) => {
  const navigate = useNavigate();

  if (!matches || matches.length === 0)
    return <p>Aucun match pour cette journée.</p>;

  return (
    <div className="match-day-card">
      <div className="match-day-title">Journée {journee}</div>

      {matches.map((m) => (
        <div
          key={m.id}
          className="match-row"
          onClick={() => navigate(`/match/${m.id}`)} // 👈 ICI
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <div className="club-home">{m.homeClubName}</div>

          <div className="score-box">
            <input
              type="number"
              value={m.homeGoals ?? ""}
              onClick={(e) => e.stopPropagation()} // empêche la navigation
              onChange={(e) =>
                onScoreChange(m.id, parseInt(e.target.value || 0), m.awayGoals)
              }
            />
            <span>-</span>
            <input
              type="number"
              value={m.awayGoals ?? ""}
              onClick={(e) => e.stopPropagation()} // empêche la navigation
              onChange={(e) =>
                onScoreChange(m.id, m.homeGoals, parseInt(e.target.value || 0))
              }
            />
          </div>

          <div className="club-away">{m.awayClubName}</div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // pour ne pas déclencher la sélection du match
              navigate(`/match/${m.id}/composition`, {
              });
            }}
          >
            Compos
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchTables;
