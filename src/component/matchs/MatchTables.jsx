import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MatchTables = ({ journee, matches, onScoreChange,league }) => {
  const navigate = useNavigate();

  // 🔹 Stocker temporairement les scores des matchs
  const [localScores, setLocalScores] = useState({}); // { matchId: { homeGoals, awayGoals } }

  const handleChange = (matchId, side, value) => {
    setLocalScores(prev => {
      const current = prev[matchId] || {};
      const updated = { ...current, [side]: parseInt(value || 0) };
      // Envoie au backend seulement si les deux valeurs sont définies
      if (updated.homeGoals != null && updated.awayGoals != null) {
        onScoreChange(matchId, updated.homeGoals, updated.awayGoals);
      }
      return { ...prev, [matchId]: updated };
    });
  };

  if (!matches || matches.length === 0)
    return <p>Aucun match pour cette journée.</p>;

  return (
    <div className="match-day-card">
      <div className="match-day-title">Journée {journee}</div>

      {matches.map((m) => {
        const score = localScores[m.id] || {
          homeGoals: m.homeGoals, 
          awayGoals: m.awayGoals
        };

        return (
          <div
            key={m.id}
            className="match-row"
            onClick={() => navigate(`/match/${m.id}`)}
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
                value={score.homeGoals}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleChange(m.id, "homeGoals", e.target.value)
                }
              />
              <span>-</span>
              <input
                type="number"
                value={score.awayGoals}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleChange(m.id, "awayGoals", e.target.value)
                }
              />
            </div>

            <div className="club-away">{m.awayClubName}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/match/${m.id}/composition/${league}`);
              }}
            >
              Compos
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MatchTables;
