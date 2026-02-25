import { useEffect, useState } from "react";
import { geClubByLeagueById } from "../api/leaguesApi";
import { generateClubs } from "../api/club";

export default function useLeagues(leagueId) {
  const [clubs, setClubs] = useState([]);
  const [leagueName, setLeagueName] = useState("");


  useEffect(() => {
   
    if (!leagueId) return;

    // Récupère la ligue
   geClubByLeagueById(leagueId)
      .then((data) => {
        //on met a jour le state React pour que l'ui se mette a jour automatiquement
        // si data ou dta .name n'existe pas cela renvoie undefined au lieu de planter
        setLeagueName(data?.name || "");

        // ⚡ Assure-toi que clubs est un tableau
        if (Array.isArray(data?.clubs)) {
          setClubs(data.clubs);
        } else {
          setClubs([]);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de la ligue:", err);
        setLeagueName("");
        setClubs([]);
      });

  }, [leagueId]);

 
  
const generateClub = async (leagueId) => {
  try {
    const data = await generateClubs(leagueId);
    console.log(data)

    if (!Array.isArray(data)) {
      throw new Error("Format de données invalide");
    }

    setClubs(data);

  } catch (err) {
    console.error("Erreur génération clubs :", err);
    setClubs([]);
  }
};



  return { clubs, setClubs, leagueName,generateClub };
}
