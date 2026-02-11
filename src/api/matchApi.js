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

export const getMatchById = async (matchId) => {
  const res = await fetch("http://localhost:8081/api/matches/" + matchId);
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
// src/api/matchApi.js

export const getMatchLineup = async (matchId) => {
  const res = await fetch("http://localhost:8081/api/matches/match/" +matchId);
  if (!res.ok) throw new Error("Impossible de récupérer la composition");
  return res.json();
};

export const getMatchEvents = async (matchId) => {
  const res = await fetch(`/api/matches/${matchId}/events`);
  if (!res.ok) throw new Error("Impossible de récupérer les événements");
  return res.json();
};


// src/api/matchApi.js
export const saveMatchLineup = async ({ matchId, lineups }) => { // "lineups" au pluriel
  const res = await fetch(`http://localhost:8081/api/matches/${matchId}/lineup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lineups), // envoyer le tableau directement
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Erreur saveMatchLineup:", text);
    throw new Error("Impossible d'enregistrer la composition");
  }

  return res.json();
};

