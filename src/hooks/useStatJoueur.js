import { useEffect, useState } from "react";
import { getStatByJoueurByChampionnat, getStatPasseur } from "../api/joueurs";

export default function useStatJoueur(leagueId){

    const [statBut, setStatBut] = useState([]);
    const [statPasse,setStatPass] = useState([]);



  useEffect(() => {
    const fetchStat = async () => {
      const dataBut = await getStatByJoueurByChampionnat(leagueId);
      const dataPasse = await getStatPasseur(leagueId);

      setStatBut(Array.isArray(dataBut) ? dataBut : []);
      setStatPass(Array.isArray(dataPasse)? dataPasse : [])
    };
    fetchStat();
  }, [leagueId]);

  

  return ({statBut,statPasse});
}