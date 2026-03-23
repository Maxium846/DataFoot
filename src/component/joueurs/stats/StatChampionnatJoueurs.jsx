import { useParams } from "react-router-dom";
import "../../../css/ficheC.css";
import useStatJoueur from "../../../hooks/useStatJoueur";
import { useState } from "react";
import StatButeur from "./StatButeur";
import StatPasseur from "./StatPasseur";

const StatChampionnatJoueurs = () => {
  const { leagueId } = useParams();

  const { statBut,statPasse } = useStatJoueur(leagueId);
  const [view, setView] = useState("Buteur");

  console.log(statPasse)
  return (
    <>
      <button onClick={() => setView("Buteur")}>Buteur</button>
      <button onClick={() => setView("Passeur")}>Passeur</button>
      <button onClick={() => setView("PrecisionPasse")}>Precision Passe</button>

      {view === "Buteur" && <StatButeur statButeur={statBut}></StatButeur>}
      {view === "Passeur" && <StatPasseur statPasseur= {statPasse}></StatPasseur>}
    </>
  );
};
export default StatChampionnatJoueurs;
