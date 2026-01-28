import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  getMatchesByLeague,
  getClassementByLeague,
  updateMatchScore,
  generateCalendar,
} from "../api/matchApi";
import MatchTables from "./matchs/MatchTables";
import Classement from "../component/Classement";

const Calendrier = () => {
  const { leagueId } = useParams();

  const [matches, setMatches] = useState([]);
  const [classement, setClassement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Charger les données
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔄 Mettre à jour un score et récupérer le classement recalculé
  const handleScoreChange = async (matchId, homeGoals, awayGoals) => {
    try {
      const updatedClassement = await updateMatchScore(matchId, homeGoals, awayGoals);

      // ⚡ Mettre à jour le classement instantanément
      setClassement(updatedClassement);

      // ⚡ Mettre à jour le match dans le state local
      setMatches((prev) =>
        prev.map((m) =>
          m.id === matchId
            ? { ...m, homeGoals, awayGoals, played: true }
            : m
        )
      );
    } catch (err) {
      console.error("Erreur update score :", err);
    }
  };

  // 🔄 Générer le calendrier et le classement
  const handleGenerateCalendar = async () => {
    setLoading(true);
    try {
      await generateCalendar(leagueId); // back-end doit générer calendrier + classement
      fetchData(); // recharge les matchs et classement
    } catch (err) {
      console.error("Erreur génération calendrier :", err);
      setError("Impossible de générer le calendrier.");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Grouper les matchs par journée
  const matchesByJournee = useMemo(() => {
    return matches.reduce((acc, match) => {
      const j = match.journey ?? "Non défini";
      if (!acc[j]) acc[j] = [];
      acc[j].push(match);
      return acc;
    }, {});
  }, [matches]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Calendrier Premier League</h1>

      <button onClick={handleGenerateCalendar}>Générer le calendrier</button>

      {Object.keys(matchesByJournee).length === 0 ? (
        <p>Aucun calendrier disponible pour cette ligue.</p>
      ) : (
        Object.entries(matchesByJournee).map(([journee, matchs]) => (
          <MatchTables
            key={journee}
            journee={journee}
            matches={matchs}
            onScoreChange={handleScoreChange}
          />
        ))
      )}

      <Classement classement={classement} loading={loading} />
    </div>
  );
};

export default Calendrier;
