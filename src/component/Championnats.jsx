import { useParams } from "react-router-dom";
import Classement from "./Classement";
import { useState } from "react";
import MatchTables from "./matchs/MatchTables";
import useMatches from "../hooks/useMatches";

const Championnats = () => {
  const { leagueId } = useParams();
  const [view, setView] = useState("classement");

  const { classement, loading, error, matchesByJournee } = useMatches(leagueId);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div>
        <button
          style={{
            backgroundColor: view === "classement" ? "#007bff" : "#ccc",
            color: "white",
            padding: "5px 10px",
          }}
          onClick={() => setView("classement")}
        >
          Classement{" "}
        </button>

        <button
          onClick={() => setView("calendrier")}
          style={{
            backgroundColor: view === "calendrier" ? "#007bff" : "#ccc",
            color: "white",
            padding: "5px 10px",
          }}
        >
          Calendrier
        </button>
      </div>

      {/* 📊 Classement */}
      {view === "classement" && (
        <Classement
          classement={classement}
          loading={loading}
          league={leagueId}
        />
      )}

      {/* 📅 Calendrier */}
      {view === "calendrier" && (
        <div>
          <h1>Calendrier</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {Object.keys(matchesByJournee).length === 0 ? (
              <p>Aucun calendrier disponible pour cette ligue.</p>
            ) : (
              Object.entries(matchesByJournee).map(([journee, matchs]) => (
                <MatchTables
                  key={journee}
                  journee={journee}
                  matches={matchs}
                  league={leagueId}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Championnats;
