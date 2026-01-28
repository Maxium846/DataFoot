// src/api/matchesApi.js

export const getMatchesByLeague = async (leagueId) => {
  const res = await fetch(`http://localhost:8081/api/matches/league/${leagueId}`);
  if (!res.ok) {
    const text = await res.text();
    console.error("Erreur fetch matches:", text);
    throw new Error("Erreur chargement matchs");
  }
  return res.json();
};



export const updateMatchScore = async (matchId, homeGoals, awayGoals) => {
  const res = await fetch(
    `http://localhost:8081/api/matches/${matchId}/score?homeGoals=${homeGoals}&awayGoals=${awayGoals}`,
    { method: "POST" }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erreur update score: ${text}`);
  }

  // ⚡ Retourner le JSON du classement recalculé
  return res.json();
};




export const getClassementByLeague = async (leagueId) => {
  // ⚡ utiliser l'URL complète avec le port du backend
  const res = await fetch(`http://localhost:8081/api/leagues/${leagueId}/classement`);
  if (!res.ok) throw new Error("Erreur chargement classement");
return res.json()};

export const generateCalendar = async (leagueId) => {
  const res = await fetch(
    `http://localhost:8081/api/calendar/generate/${leagueId}`,
    { method: "POST" }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
};

