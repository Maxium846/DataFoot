const BASE_URL = "http://localhost:8081/api";

export async function getAllLeague() {
  try {
    const response = await fetch("http://localhost:8081/api/leagues");

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des ligues");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function geClubByLeagueById(id) {
  try {
    const response = await fetch(`${BASE_URL}/leagues/${id}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la ligue");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getClassementByLeague(leagueId) {
  try {
    const res = await fetch(`${BASE_URL}/leagues/${leagueId}/classement`);

    if (!res.ok) {
      throw new Error("Erreur lors du chargement du classement");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
