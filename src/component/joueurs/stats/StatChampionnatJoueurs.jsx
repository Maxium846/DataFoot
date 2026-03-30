import { useParams } from "react-router-dom";
import useStatJoueur from "../../../hooks/useStatJoueur";
import { useState } from "react";
import StatButeur from "./StatButeur";
import StatPasseur from "./StatPasseur";
import "../../../css/statJoueur.css";


const StatChampionnatJoueurs = () => {
  const { leagueId } = useParams();
  const [view, setView] = useState("StatOffensive");

  const {
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
  } = useStatJoueur(leagueId);

  console.log(statOffensive)
  return (
    <>
      <select
        className="select-custom"
        value={view}
        onChange={(e) => setView(e.target.value)}
      >
        <option value="StatOffensive">Offensive</option>
        <option value="StatPasse">Passe</option>
      </select>

      {view === "StatOffensive" && (
        <>
          <StatButeur statOffensive={statOffensive} trierStat={trierStat} />
          <div>
            <button
              onClick={() => setPageOffensive((p) => Math.max(p - 1, 0))}
              disabled={pageOffensive === 0}
            >
              Précédent
            </button>

            <span>
              Page {pageOffensive + 1} / {totalPagesOffensive}
            </span>

            <button
              onClick={() =>
                setPageOffensive((p) =>
                  Math.min(p + 1, totalPagesOffensive - 1),
                )
              }
              disabled={pageOffensive + 1 >= totalPagesOffensive}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {view === "StatPasse" && (
        <>
          <StatPasseur statPasseur={statPasse} trierPass={trierPass} />
          <div>
            <button
              onClick={() => setPagePasse((p) => Math.max(p - 1, 0))}
              disabled={pagePasse === 0}
            >
              Précédent
            </button>

            <span>
              Page {pagePasse + 1} / {totalPagePasse}
            </span>

            <button
              onClick={() =>
                setPagePasse((p) => Math.min(p + 1, totalPagePasse - 1))
              }
              disabled={pagePasse + 1 >= totalPagePasse}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default StatChampionnatJoueurs;
