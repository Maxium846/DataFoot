import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/calendrier.css";

const MatchTables = ({ journee, matches, onScoreChange, league }) => {
  const navigate = useNavigate();
  const [localScores, setLocalScores] = useState({});

  const handleChange = (matchId, side, value) => {
    setLocalScores(prev => {
      const current = prev[matchId] || {};
      const updated = { ...current, [side]: parseInt(value || 0) };

      if (updated.homeGoals != null && updated.awayGoals != null) {
        onScoreChange(matchId, updated.homeGoals, updated.awayGoals);
      }

      return { ...prev, [matchId]: updated };
    });
  };
  if (!matches || matches.length === 0)
    return <p>Aucun match pour cette journée.</p>;

  return (
    <div className="calendar-card">
      <h2 className="calendar-title">Journée {journee}</h2>

      <div className="matches-container">
        {matches.map((m) => {
          const score = localScores[m.id] || {
            homeGoals: m.homeGoals,
            awayGoals: m.awayGoals
          };

          return (
            <div
              key={m.id}
              className="match-card"
              onClick={() => navigate(`/match/${m.id}`)}
            >
              <div className="team team-home">{m.homeClubName}</div>

              <div className="score-section">
                <input
                  type="number"
                  value={score.homeGoals}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleChange(m.id, "homeGoals", e.target.value)
                  }
                />
                <span className="dash">-</span>
                <input
                  type="number"
                  value={score.awayGoals}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleChange(m.id, "awayGoals", e.target.value)
                  }
                />
              </div>

              <div className="team team-away">{m.awayClubName}</div>

              <button
                className="compo-btn"
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
    </div>
  );
};

export default MatchTables;
