import { useNavigate, useParams } from "react-router-dom";
import useClub from "../../hooks/useClub";
import useClassement from "../../hooks/useClassement";
import "../../css/ficheC.css";
const FicheClub = () => {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const { ficheClub, loading, error } = useClub(clubId);
  const { classement } = useClassement(ficheClub?.leagueId);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!ficheClub) return <p>Aucun club trouvé</p>;

  const clubStats = classement.find(c => c.clubId === Number(clubId));
  console.log(clubStats);

  return (
    <div className="fiche-club-container">
      <button className="back-btn" onClick={() => navigate(`/championnat/${ficheClub.leagueId}`)}>
        ← Retour
      </button>

      <h2 className="club-name"> Stats {ficheClub.name}</h2>

      {clubStats ? (
        <div className="vertical-stats">
          <div className="stat">
            <span className="label">Position:</span>
            <span className="value">{clubStats.position}</span>
          </div>
          <div className="stat">
            <span className="label">Points:</span>
            <span className="value">{clubStats.points}</span>
          </div>
          <div className="stat">
            <span className="label">Victoires:</span>
            <span className="value">{clubStats.wins}</span>
          </div>
          <div className="stat">
            <span className="label">Nuls:</span>
            <span className="value">{clubStats.draws}</span>
          </div>
          <div className="stat">
            <span className="label">Défaites:</span>
            <span className="value">{clubStats.losses}</span>
          </div>
          <div className="stat">
            <span className="label">Buts pour:</span>
            <span className="value">{clubStats.goalsFor}</span>
          </div>
          <div className="stat">
            <span className="label">Buts contre:</span>
            <span className="value">{clubStats.goalsAgainst}</span>
          </div>
          <div className="stat">
            <span className="label">Différence:</span>
            <span className="value">{clubStats.goalDifference}</span>
          </div>
        </div>
      ) : (
        <p>Stats non disponibles pour ce club.</p>
      )}
    </div>
  );
};

export default FicheClub;
