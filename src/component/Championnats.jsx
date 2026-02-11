import { useParams } from "react-router-dom";
import Classement from "./Classement";
import { useState } from "react";
import MatchTables from "./matchs/MatchTables";
import useMatches from "../hooks/useMatches";

const Championnats = () => {
const { leagueId } = useParams();
const [view, setView] = useState("classement");

const {
classement,
loading,
error,
handleGenerateCalendar,
handleScoreChange,
matchesByJournee,
} = useMatches(leagueId);

if (loading) return <p>Chargement...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;

return ( <div>
{/* 🔘 Boutons de toggle */}
<div style={{ marginBottom: "20px" }}>
<button
onClick={() => setView("classement")}
style={{
marginRight: "10px",
backgroundColor: view === "classement" ? "#007bff" : "#ccc",
color: "white",
padding: "5px 10px",
}}
>
Classement </button>

```
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

      <button
        onClick={handleGenerateCalendar}
        style={{ marginBottom: "20px" }}
      >
        Générer le calendrier
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {Object.keys(matchesByJournee).length === 0 ? (
          <p>Aucun calendrier disponible pour cette ligue.</p>
        ) : (
          Object.entries(matchesByJournee).map(([journee, matchs]) => (
            <MatchTables
              key={journee}
              journee={journee}
              matches={matchs}
              onScoreChange={handleScoreChange}
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
