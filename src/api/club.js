export async function getFicheClubs(id) {
  const res = await fetch("http://localhost:8081/api/clubs/" + id);
  try {
    if (!res.ok) {
      throw new Error("Erreur lors de la récupération des clubs");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function generateClubs(leagueId) {
  try {
    const response = await fetch("/api/clubs/generate-clubs/" + leagueId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la génération des clubs");
    }

    return await response.json();
  } catch (error) {
    console.log("Erreur génération clubs :", error);
    return null;
  }
}
