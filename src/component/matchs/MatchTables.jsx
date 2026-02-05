import React from "react";

const MatchTables = ({ journee, matches, onScoreChange }) => {
  if (!matches || matches.length === 0) return <p>Aucun match pour cette journée.</p>;

  return (
    <div className="match-day-card">
      <div className="match-day-title">Journée {journee}</div>

      {matches.map((m) => (
        <div key={m.id} className="match-row">
          
          <div className="club-home">
            {m.homeClubName}
          </div>

          <div className="score-box">
            <input
              type="number"
              value={m.homeGoals ?? ""}
              onChange={(e) =>
                onScoreChange(
                  m.id,
                  parseInt(e.target.value || 0),
                  m.awayGoals
                )
              }
            />
            <span className="score-separator">-</span>
            <input
              type="number"
              value={m.awayGoals ?? ""}
              onChange={(e) =>
                onScoreChange(
                  m.id,
                  m.homeGoals,
                  parseInt(e.target.value || 0)
                )
              }
            />
          </div>

          <div className="club-away">
            {m.awayClubName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchTables;


