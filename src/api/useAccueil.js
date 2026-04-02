export const getClassementAccueil = async () => {
  const res = await fetch(
    "http://localhost:8081/api/leagues/classementAccueil",
  );

  if (!res.ok) {
    console.error("Erreur fetch matches:");
    throw new Error("Erreur chargement matchs");
  }

  return res.json();
};
