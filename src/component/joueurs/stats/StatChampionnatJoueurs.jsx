import { useParams } from "react-router-dom";
import "../../../css/ficheC.css";
import useStatJoueur from "../../../hooks/useStatJoueur";
import { useState } from "react";
import StatButeur from "./StatButeur";
import StatPasseur from "./StatPasseur";

const StatChampionnatJoueurs = () => {
  const { leagueId } = useParams();

  const { statOffensive, statPasse, trierStatOffensive } =
    useStatJoueur(leagueId);
  const [view, setView] = useState("StatOffensive");

  return (
    <>
      <select onChange={(e)=>setView(e.target.value)}>
        {
          <>
          <option value={"StatOffensive"}>Buteur</option>
          <option value={"StatPasse"}>Passeur</option>
          </>
        }
      </select>

      {view === "StatOffensive" && (
        <StatButeur
          statOffensive={statOffensive}
          trierStatOffensive={trierStatOffensive}
        ></StatButeur>
      )}
      {view === "StatPasse" && (
        <StatPasseur statPasseur={statPasse}></StatPasseur>
      )}
    </>
  );
};
export default StatChampionnatJoueurs;
