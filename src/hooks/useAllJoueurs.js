import { useEffect, useState } from "react"
import { getAllJoueur, getJoueurByGuessFacile } from "../api/joueurs";

const useAllJoueurs = () => {

    const [listeJoueur,setListeJoueur] = useState([]);
    const [listeJoueurGuessFacile,setListeJoueurGuessFacile] = useState([])

    const leagueId = 1;
     useEffect(() => {
     const fetchData = async () => {
       const data = await getAllJoueur();
       setListeJoueur(data);
     };
     fetchData();
   }, []);


  
     useEffect(() => {
     const fetchData = async () => {
       const data = await getJoueurByGuessFacile(leagueId);
       setListeJoueurGuessFacile(data);
     };
     fetchData();
   }, []);


   return {
    listeJoueur,
    listeJoueurGuessFacile
   }
}


export default useAllJoueurs;