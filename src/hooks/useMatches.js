import { useCallback, useEffect, useMemo, useState } from "react";
import { getClassementByLeague } from "../api/leaguesApi";
import { useParams } from "react-router-dom";
import { getMatchesByLeague } from "../api/matchApi";

export default function useMatches() {
const { leagueId } = useParams();
const [classement, setClassement] = useState([]);
const [matches, setMatches] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);



  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [m, c] = await Promise.all([
        getMatchesByLeague(leagueId),
        getClassementByLeague(leagueId),
      ]);

      setMatches(Array.isArray(m) ? m : []);
      setClassement(Array.isArray(c) ? c : []);
    } catch (err) {
      console.error("Erreur chargement données :", err);
      setError("Impossible de charger les données.");
      setMatches([]);
      setClassement([]);
    } finally {
      setLoading(false);
    }
  }, [leagueId]);

  // 🔹 Génération du calendrier via backend
  

  // 🔹 Classement des matchs par journée
  const matchesByJournee = useMemo(() => {
    const sortedMatches = [...matches].sort(
      (a, b) => a.journee - b.journee || a.id - b.id
    );

    return sortedMatches.reduce((acc, match) => {
      const j = match.journee ?? "non défini";
      if (!acc[j]) acc[j] = [];
      acc[j].push(match);
      return acc;
    }, {});
  }, [matches]);

  

  // 🔹 On charge les données au montage
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    classement,
    loading,
    error,
    matchesByJournee,
    matches,
  };
}
