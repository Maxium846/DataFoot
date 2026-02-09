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

  const handleGenerateCalendar = async () => {
    setLoading(true);
    try {
      await generateCalendar(leagueId);
      fetchData();
    } catch (err) {
      console.log("Erreur de génération du calendrier", err);
      setError("Impossoble de générer le calendrier");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const matchesByJournee = useMemo(() => {
    const sortedMatches = [...matches].sort(
      (a, b) => a.journee - b.journee || a.id - b.id,
    );

    return sortedMatches.reduce((acc, match) => {
      const j = match.journee ?? "non défini";
      if (!acc[j]) acc[j] = [];
      acc[j].push(match);
      return acc;
    }, {});
  }, [matches]);

  const handleScoreChange = async (matchId, homeGoals, awayGoals) => {
    try {
      const updatedClassement = await updateMatchScore(
        matchId,
        homeGoals,
        awayGoals,
      );

      setClassement(updatedClassement);

      setMatches((prevMatches) =>
        prevMatches.map((m) =>
          m.id === matchId ? { ...m, homeGoals, awayGoals, played: true } : m,
        ),
      );
    } catch (err) {
      console.error("Erreur update score :", err);
    }
}

return {classement,loading,error,handleGenerateCalendar,handleScoreChange,matchesByJournee,matches}
}
