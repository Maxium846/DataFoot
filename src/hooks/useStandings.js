import { useEffect, useState } from "react";

export default function useStandings(leagueId) {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!leagueId) return;

    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);



        const res = await fetch(`http://localhost:8081/api/proxy/leagues/${leagueId}/standings`);
        if (!res.ok) throw new Error("Erreur lors du chargement du classement");

        const data = await res.json();

        // Adapter selon la structure renvoyée par l'API distante
        // Exemple : data.standings ou data.clubs
        setStandings(data.standings || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le classement");
        setStandings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [leagueId]);

  return { standings, loading, error };
}
