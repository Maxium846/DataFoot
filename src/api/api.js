export async function getClubs() {
  const res = await fetch("http://localhost:8081/api/clubs");
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des clubs");
  }
  return res.json();
}

export async function createClub(club) {
  const res = await fetch("http://localhost:8081/api/clubs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(club),
  });
  return res.json();
}
