import { useParams } from "react-router-dom";
import useClubs from "../../hooks/useLeagues";
export default function ClubList() {
  const { leagueId } = useParams();

  // State pour le nom de la ligue

  // Hook pour gérer les clubs
 const { clubs, leagueName, generateClub } =
    useClubs(leagueId);
  // Charger le nom de la ligue et ses clubs depuis le backend

  return (
    <div>
      <h2>Clubs du championnat de {leagueName || "..."}</h2>
      <div>
        <button
          onClick={() => generateClub(leagueId)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >Generer club</button>
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
                <td>{club.name}</td>
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
