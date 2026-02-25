import { useEffect, useState } from "react";
import { getJoueurs } from "../api/joueurs";

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

 


  const sortByPosition = () => {
    const sorted = [...joueurs].sort((a, b) => {
      const posA = positionOrder[a.position] ?? 99;
      const posB = positionOrder[b.position] ?? 99;
      return asc ? posA - posB : posB - posA;
    });

    setJoueurs(sorted);
    setAsc(!asc);
  };

  return { joueurs, sortByPosition };
}
