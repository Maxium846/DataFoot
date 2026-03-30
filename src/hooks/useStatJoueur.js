import { useEffect, useState } from "react";
import { getStatByJoueurByChampionnat, getStatPasseur } from "../api/joueurs";

export default function useStatJoueur(leagueId) {
  const [statOffensive, setStatOffensive] = useState([]);
  const [statPasse, setStatPass] = useState([]);

  const [pageOffensive, setPageOffensive] = useState(0);
  const [totalPagesOffensive, setTotalPagesOffensive] = useState(0);

  const [pagePasse, setPagePasse] = useState(0);
  const [totalPagePasse, setTotaPagePasse] = useState(0);

  const size = 20;
  useEffect(() => {
    const fetchStat = async () => {
      const dataBut = await getStatByJoueurByChampionnat(
        leagueId,
        pageOffensive,
        size,
      );
      console.log(dataBut)
      const dataPasse = await getStatPasseur(leagueId, pagePasse, size);

      setStatOffensive(dataBut.content || []);
      setTotalPagesOffensive(dataBut.totalPages || 0);
      setStatPass(dataPasse.content || []);
      setTotaPagePasse(dataPasse.totalPages || 0);
    };

    fetchStat();
  }, [leagueId, pageOffensive, pagePasse]);

  const trierStat = (cle) => {
    const sorted = [...statOffensive].sort(
      (a, b) => Number(b[cle] || 0) - Number(a[cle] || 0),
    );

    setStatOffensive(sorted);
  };


  const trierPass = (cle) => {
    const sorted = [...statPasse].sort(
      (a, b) => Number(b[cle] || 0) - Number(a[cle] || 0),
    );

    setStatPass(sorted);
  };
  return {
    statOffensive,
    statPasse,
    pageOffensive,
    setPageOffensive,
    totalPagesOffensive,
    pagePasse,
    setPagePasse,
    totalPagePasse,
    trierStat,
    trierPass,
  };
}
