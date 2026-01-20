import { useEffect, useState } from "react";
import { getLeagueById } from "../api/leaguesApi";

export default function useLeagues(leagueId) {
  const [clubs, setClubs] = useState([]);
  const [leagueName, setLeagueName] = useState("");

  useEffect(() => {
    if (!leagueId) return;

  
    // Récupère la ligue
    getLeagueById(leagueId)
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

  const addClub = (club) => {
    setClubs((prev) => [...prev, club]);
  };

  const handleDelete = (id) => {
    setClubs((prev) => prev.filter((club) => club.id !== id));
  };

  return { clubs, addClub, handleDelete, setClubs, leagueName };
}
