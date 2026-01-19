import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ClubForm from "./ClubForm";
import useClubs from "../../hooks/useClubs";
import { getLeagueById } from "../../api/leaguesApi";

export default function ClubList() {
  const { leagueId } = useParams();

  // State pour le nom de la ligue
  const [leagueName, setLeagueName] = useState("");

  // Hook pour gérer les clubs
  const { clubs, addClub, handleDelete, setClubs } = useClubs(leagueId);

  // Charger le nom de la ligue et ses clubs depuis le backend
  useEffect(() => {
    if (!leagueId) return;

    // Récupère la ligue
    getLeagueById(leagueId)
      .then((data) => {
        setLeagueName(data?.name || "");

        // ⚡ Assure-toi que clubs est un tableau
        if (Array.isArray(data?.clubs)) {
          setClubs(data.clubs);
        } else {
          setClubs([]);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de la ligue:", err);
        setLeagueName("");
        setClubs([]);
      });
  }, [leagueId, setClubs]);

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
          {Array.isArray(clubs) && clubs.length > 0 ? (
            clubs.map((club) => (
              <tr key={club.id}>
                <td>{club.name}</td>
                <td>
                  <button onClick={() => handleDelete(club.id)}>Supprimer</button>
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
      <ClubForm onSubmit={addClub} />
    </div>
  );
}
