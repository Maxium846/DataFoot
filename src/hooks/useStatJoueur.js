import { useEffect, useState } from "react";
import { getStatByJoueurByChampionnat, getStatPasseur } from "../api/joueurs";

export default function useStatJoueur(leagueId) {
  const [statOffensive, setStatOffensive] = useState([]);
  const [statPasse, setStatPass] = useState([]);

  useEffect(() => {
    const fetchStat = async () => {
      const dataBut = await getStatByJoueurByChampionnat(leagueId);
      const dataPasse = await getStatPasseur(leagueId);

      setStatOffensive(Array.isArray(dataBut) ? dataBut : []);
      setStatPass(Array.isArray(dataPasse) ? dataPasse : []);
    };

    fetchStat();
  }, [leagueId]);

  const trierStatOffensive = (cle) => {
    const sorted = [...statOffensive].sort(
      (a, b) => Number(b[cle] || 0) - Number(a[cle] || 0)
    );

    setStatOffensive(sorted);
  };

  return {
    statOffensive,
    statPasse,
    trierStatOffensive,
  };
}