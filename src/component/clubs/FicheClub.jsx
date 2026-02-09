import { useNavigate, useParams } from "react-router-dom";
import useClub from "../../hooks/useClub";
import "../../css/ficheC.css";
import useMatches from "../../hooks/useMatches";
import MatchRow from "../matchs/MatchRow";

const FicheClub = () => {
  const navigate = useNavigate();
  const { clubId, leagueId } = useParams();

  const { matchesByJournee } = useMatches(leagueId);
  const { ficheClub, loading, error } = useClub(clubId);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!ficheClub) return <p>Aucun club trouvé</p>;

  // On filtre uniquement les matchs de ce club
  const clubMatchesByJournee = Object.fromEntries(
    Object.entries(matchesByJournee || {}).map(([journee, matchs]) => [
      journee,
      matchs.filter(
        (m) =>
          m.homeClubId === Number(clubId) ||
          m.awayClubId === Number(clubId)
      ),
    ])
  );

  return (
<>
    <div>
      <button
        className="back-btn"
        onClick={() =>
          navigate(`/championnat/${ficheClub.leagueId}/classement`)
        }
      >
        ← Retour
      </button>
    </div>
    <div className="fiche-club-card">
      

      {/* HEADER */}
      <div className="club-header">
        <div className="club-logo">
          {ficheClub.name.slice(0, 2).toUpperCase()}
        </div>

        <div className="club-details">
          <span className="label">Nom:</span>
          <span>{ficheClub.name}</span>

          <span className="label">Président:</span>
          <span>{ficheClub.president}</span>

          <span className="label">Entraîneur:</span>
          <span>{ficheClub.entraineur}</span>

          <span className="label">Année de création:</span>
          <span>{ficheClub.dateCreation}</span>
        </div>
      </div>

      {/* CALENDRIER */}
      <div className="club-matches">
        <h2>Calendrier du club</h2>

        {Object.entries(clubMatchesByJournee).map(([journee, matchs]) =>
          matchs.length > 0 ? (
            <MatchRow
              key={journee}
              journee={journee}
              matches={matchs}
              clubId={clubId}
            />
          ) : null
        )}
      </div>
    </div>
    </>
  );
};

export default FicheClub;
