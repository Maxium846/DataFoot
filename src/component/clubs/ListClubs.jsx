import { useNavigate, useParams } from "react-router-dom";
import useClubs from "../../hooks/useLeagues";
export default function ClubList() {
  const { leagueId } = useParams();
  const navigate = useNavigate();
  // State pour le nom de la ligue

  // Hook pour gérer les clubs
  const { clubs, leagueName } = useClubs(leagueId);
  // Charger le nom de la ligue et ses clubs depuis le backend

  console.log(clubs.id)
  return (
    <div>
      <h2>Clubs du championnat de {leagueName || "..."}</h2>
      <div>
    
      </div>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {clubs.length > 0 ? (
            clubs.map((club) => (
              <tr key={club.id}>
                <td onClick={()=> navigate(`/ficheClub/${leagueId}/${club.id}`)}>{club.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>Aucun club trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
