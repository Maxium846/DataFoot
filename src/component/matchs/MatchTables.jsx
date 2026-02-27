import { useNavigate } from "react-router-dom";
import "../../css/calendrier.css";

const MatchTables = ({ journee, matches, league }) => {
  const navigate = useNavigate();

  if (!matches || matches.length === 0)
    return <p>Aucun match pour cette journée.</p>;

  return (
    <div className="calendar-card">
      <h2 className="calendar-title">Journée {journee}</h2>

      <div className="matches-container">
        {matches.map((m) => (
          <div
            key={m.id}
            className="match-card"
            onClick={() => navigate(`/match/${m.id}`)}
          >
            <div className="team team-home">{m.homeClubName}</div>

            <div className="score-section">
              <span>{m.homeGoals ?? "-"}</span>
              <span className="dash">-</span>
              <span>{m.awayGoals ?? "-"}</span>
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
        ))}
      </div>
    </div>
  );
};

export default MatchTables;