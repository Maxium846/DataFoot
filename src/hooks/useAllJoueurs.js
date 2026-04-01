import { useEffect, useState } from "react"
import { getAllJoueur } from "../api/joueurs";

const useAllJoueurs = () => {

    const [listeJoueur,setListeJoueur] = useState([]);

     useEffect(() => {
     const fetchData = async () => {
       const data = await getAllJoueur();
       setListeJoueur(data);
     };
     fetchData();
   }, []);

   return {

    listeJoueur
   }
}

export default useAllJoueurs;