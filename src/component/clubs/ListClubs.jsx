import { useParams } from "react-router-dom";
import ClubForm from "./ClubForm";
import useClubs from "../../hooks/useLeagues";
export default function ClubList() {
  const { leagueId } = useParams();

  // State pour le nom de la ligue

  // Hook pour gérer les clubs
  const { clubs, addClub, handleDelete,leagueName } = useClubs(leagueId);
  // Charger le nom de la ligue et ses clubs depuis le backend
  

  return (
    <div>
      <h2>Clubs du championnat de {leagueName || "..."}</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.length > 0 ? (
            clubs.map((club) => (
              <tr key={club.id}>
                <td>{club.name}</td>
                <td>
                  <button onClick={() => handleDelete(club.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>Aucun club trouvé</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Ajouter un club</h3>
      <ClubForm onSubmit={addClub} leagueId={leagueId} />
    </div>
  );
}
