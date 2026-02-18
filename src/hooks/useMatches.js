import { useCallback, useEffect, useMemo, useState } from "react";
import { generateCalendar, updateMatchScore } from "../api/matchApi";
import { getClassementByLeague, getMatchesByLeague } from "../api/leaguesApi";
import { useParams } from "react-router-dom";

export default function useMatches() {
  const { leagueId } = useParams();
const [classement, setClassement] = useState([]);
const [matches, setMatches] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);



  // 🔹 Récupération des données depuis la BDDs
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
  const handleGenerateCalendar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Appelle le backend qui récupère tout depuis FPL
      await generateCalendar(leagueId);

      // Recharge les matchs depuis ta BDD
      await fetchData();
    } catch (err) {
      console.error("Erreur génération calendrier :", err);
      setError("Impossible de générer le calendrier.");
    } finally {
      setLoading(false);
    }
  }, [leagueId, fetchData]);

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

  // 🔹 Mise à jour des scores
  const handleScoreChange = async (matchId, homeGoals, awayGoals) => {
    try {
      const updatedClassement = await updateMatchScore(matchId, homeGoals, awayGoals);

      setClassement(updatedClassement);

      setMatches((prevMatches) =>
        prevMatches.map((m) =>
          m.id === matchId
            ? { ...m, homeGoals, awayGoals, played: true }
            : m
        )
      );
    } catch (err) {
      console.error("Erreur update score :", err);
    }
  };

  // 🔹 On charge les données au montage
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    classement,
    loading,
    error,
    handleGenerateCalendar,
    handleScoreChange,
    matchesByJournee,
    matches,
  };
}
