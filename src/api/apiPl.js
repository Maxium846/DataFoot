const BASE_URL = "http://localhost:8081/api/fpl";

export async function getFixtures() {
  const response = await fetch("http://localhost:8081/api/fpl/fixtures");
  if (!response.ok) {
    throw new Error("Erreur récupération fixtures");
  }
  return response.json();
}

export async function getTeams() {
  const response = await fetch(`${BASE_URL}/teams`);
  if (!response.ok) {
    throw new Error("Erreur récupération teams");
  }
  return response.json();
}
