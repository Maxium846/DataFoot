import { useEffect, useState } from "react";
import { createJoueur, deleteJoueur, getJoueurs } from "../api/joueurs";

export default function useJoueurs(clubId) {
  const [joueurs, setJoueurs] = useState([]);
  const [asc, setAsc] = useState(true);

  const positionOrder = {
    Goalkeeper: 1,
    Defender: 2,
    Midfielder: 3,
    Forward: 4,
  };

  useEffect(() => {
    const fetchJoueurs = async () => {
      const data = await getJoueurs(clubId);
      setJoueurs(data);
    };

    if (clubId) fetchJoueurs();
  }, [clubId]);

  const addJoueur = async (joueurData) => {
    try {
      const newJoueur = await createJoueur(joueurData);
      setJoueurs((prev) => [...prev, newJoueur]);
    } catch (err) {
      console.error("Erreur création", err);
    }
  };

  const handleDelete = (id) => {
    deleteJoueur(id)
      .then(() => {
        setJoueurs((prev) => prev.filter((j) => j.id !== id));
      })
      .catch((err) => console.error("Erreur suppression", err));
  };

  const sortByPosition = () => {
    const sorted = [...joueurs].sort((a, b) => {
      const posA = positionOrder[a.position] ?? 99;
      const posB = positionOrder[b.position] ?? 99;
      return asc ? posA - posB : posB - posA;
    });

    setJoueurs(sorted);
    setAsc(!asc);
  };

  return { joueurs, addJoueur, handleDelete, sortByPosition };
}
