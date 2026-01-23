import { useEffect, useState } from "react";
import { getClassementByLeague } from "../api/leaguesApi";

export default function useClassement(leagueId) {
  const [classement, setClassement] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //se déclare au premier rendu et a chaque changement de leagueId
  useEffect(() => {
    if (!leagueId) return;

    const fetchClassement = async () => {
      try {
        setLoading(true);
        setError(null);
        setClassement([]); // ✅ vide le tableau avant de charger les nouvelles données

        const data = await getClassementByLeague(leagueId);

//        console.log("📦 Données brutes API :", data);
        // Remplace l’ancien classement par le nouveau
        setClassement(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur chargement classement :", err);
        setError("Impossible de charger le classement");
        setClassement([]);
      } finally {
        setLoading(false);
      }
      
    };

    fetchClassement();
    
  }, [leagueId]);

  return { classement, loading, error };
}
