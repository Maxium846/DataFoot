import { useEffect, useState } from "react";
import { geClubByLeagueById } from "../api/leaguesApi";
import { createClub, deleteClub } from "../api/api";

export default function useLeagues(leagueId) {
  const [clubs, setClubs] = useState([]);
  const [leagueName, setLeagueName] = useState("");


  useEffect(() => {
   
    if (!leagueId) return;

    // Récupère la ligue
   geClubByLeagueById(leagueId)
      .then((data) => {
        //on met a jour le state React pour que l'ui se mette a jour automatiquement
        // si data ou dta .name n'existe pas cela renvoie undefined au lieu de planter
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

  }, [leagueId]);

  const addClub = (clubData) => {
    createClub({ ...clubData, leagueId: Number(leagueId) })
      .then((newClub) => {
        setClubs((prev) => [...prev, newClub]); // mise à jour immédiate de la table
      })
      .catch((err) => console.error("Erreur lors de l'ajout du club :", err));
  };
  const handleDelete = (id) => {
    deleteClub(id)
      .then(() => {
        setClubs((prev) => prev.filter((club) => club.id !== id));
      })
      .catch((err) => console.error("Erreur lors de la suppression :", err));
  };

  return { clubs, addClub, handleDelete, setClubs, leagueName };
}
