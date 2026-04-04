import { useEffect, useMemo, useState } from "react";
import { getClassementByLeague } from "../api/leaguesApi";
import { useParams } from "react-router-dom";
import { getMatchesByLeague } from "../api/matchApi";

export default function useMatches() {
  const { leagueId } = useParams();
  const [classement, setClassement] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const fetchData = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const [m, c] = await Promise.all([
  //       getMatchesByLeague(leagueId),
  //       getClassementByLeague(leagueId),
  //     ]);

  //     setMatches(Array.isArray(m) ? m : []);
  //     setClassement(Array.isArray(c) ? c : []);
  //   } catch (err) {
  //     console.error("Erreur chargement données :", err);
  //     setError("Impossible de charger les données.");
  //     setMatches([]);
  //     setClassement([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [leagueId]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const [m, c] = await Promise.all([
          getMatchesByLeague(leagueId),
          getClassementByLeague(leagueId),
        ]);
        setMatches(Array.isArray(m) ? m : []);
        setClassement(Array.isArray(c) ? c : []);
      } catch (err) {
        console.error("Erreur chargement de donnée", err);
        setError("Impossible de charger les données");
        setMatches([]);
        setClassement([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [leagueId]);

  // 🔹 Classement des matchs par journée
  const matchesByJournee = useMemo(() => {
    console.log("Calcul des matches par journée"); // <- trace ici
    const sortedMatches = [...matches].sort(
      (a, b) => a.journee - b.journee || a.id - b.id,
    );

    const result = {};
    for (const match of sortedMatches) {
      const j = match.journee ?? "Journée non défini";
      if (!result[j]) {
        result[j] = [];
      }
      result[j].push(match);
    }

    return result;
    // return sortedMatches.reduce((acc, match) => {
    //   const j = match.journee ?? "non défini";
    //   if (!acc[j]) acc[j] = [];
    //   acc[j].push(match);

    //   return acc;
    // }, {});
  },[matches]);
  console.log(matchesByJournee)

  return {
    classement,
    loading,
    error,
    matchesByJournee,
    matches,
  };
}
