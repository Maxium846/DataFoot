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
