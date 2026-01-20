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
export async function getLeagueById(id) {
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

export async function getLeagueDetailById(id) {
  const res = await fetch("http://localhost:8081/api/leagues/" + id);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des clubs");
  }
 
  return res.json();
}
