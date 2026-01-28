import { useEffect, useState } from "react";
import { getFicheClubs } from "../api/club";

export default function useClub(clubId) {
  const [ficheClub, setFicheClub] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clubId) return;

    const fetchClub = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getFicheClubs(clubId);
        //console.log("📦 Fiche club reçue :", data);

        setFicheClub(data);
      } catch (err) {
        console.error("Erreur chargement fiche club :", err);
        setError("Impossible de charger la fiche du club");
        setFicheClub(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubId]);

  return { ficheClub, loading, error };
}
