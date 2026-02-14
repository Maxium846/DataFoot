import React from "react";

const MatchRow = ({ journee, matches, clubId }) => {
  return (
    <div className="match-day-card">
      <div className="match-day-title">Journée {journee}</div>

      {matches.map((m) => {
        // Vérifie si le club sélectionné joue à domicile ou à l'extérieur
        const isHome = m.homeClubId === Number(clubId);
        const isAway = m.awayClubId === Number(clubId);

        // Déterminer le résultat pour le club sélectionné
        let scoreClass = "";
        if ((isHome && m.homeGoals > m.awayGoals) || (isAway && m.awayGoals > m.homeGoals)) {
          scoreClass = "match-win"; // vert
        } else if ((isHome && m.homeGoals < m.awayGoals) || (isAway && m.awayGoals < m.homeGoals)) {
          scoreClass = "match-lose"; // rouge
        }

        return (
          <div key={m.id} className="match-row">
            <div className="club-home">{m.homeClubName}</div>

            <div className={`score-box ${scoreClass}`}>
              <span>{m.homeGoals ?? "-"}</span>
              <span className="score-separator">-</span>
              <span>{m.awayGoals ?? "-"}</span>
            </div>

            <div className="club-away">{m.awayClubName}</div>
            <div>{m.matchDate}</div>

          </div>
        );
      })}
    </div>
  );
};

export default MatchRow;
