import { useEffect, useState } from "react";
import MatchStats from "./MatchStats";
import { useParams } from "react-router-dom";
import {
  getMatchById,
  getMatchLineup,
  getMatchStatByMatchId,
} from "../../api/matchApi";
import Pitch from "./Terrains";
import MatchResume from "./MatchResume";

const Match = () => {
  const [view, setView] = useState("Résumé");
  const { matchId } = useParams();
  console.log(matchId);

  const [lineUp, setLineUp] = useState([]);
  const [match, setMatch] = useState(null);
  const [events, setEvent] = useState([]);

  useEffect(() => {
    const fetchMatch = async () => {
      const m = await getMatchById(matchId);
      setMatch(m);
    };
    fetchMatch();
  }, [matchId]);

  useEffect(() => {
    if (!match) return;
    const fetchLineups = async () => {
      const dataLineup = await getMatchLineup(match.id);
      setLineUp(dataLineup);
    };
    fetchLineups();
  }, [match]);

  useEffect(() => {
    const fetchEvent = async () => {
      const dataEvent = await getMatchStatByMatchId(matchId);
      setEvent(dataEvent);
    };
    fetchEvent();
  }, [matchId]);

  if (!match) return <div>Chargement...</div>;
  const homeClub = lineUp.filter(
    (l) => l.clubId === match.homeClubId && l.starter,
  );
  const awayClub = lineUp.filter(
    (l) => l.clubId === match.awayClubId && l.starter,
  );

  return (
    <div>
      <div
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold" }}
      >
        {match.homeClubName} {match.homeGoals} - {match.awayGoals}
        {match.awayClubName}{" "}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <button
          style={{ backgroundColor: "gray" }}
          onClick={() => setView("Résumé")}
        >
          Résumé
        </button>

        <button
          style={{ backgroundColor: "gray" }}
          onClick={() => setView("StatMacth")}
        >
          StatMatch
        </button>

        <button
          style={{ backgroundColor: "gray" }}
          onClick={() => setView("Composition")}
        >
          Composition
        </button>
      </div>
      <div>
        {view === "StatMacth" && <MatchStats matchId={matchId}></MatchStats>}
      </div>
      <div>
        {view === "Composition" && (
          <div style={{ display: "flex" }}>
            <Pitch players={homeClub} events={events} teamColor="#2563eb" />
            <Pitch players={awayClub} events={events} teamColor="#ef4444" />
          </div>
        )}
      </div>

      <div>
        {view === "Résumé" && (
          <MatchResume
            events={events}
            players={lineUp}
            homeClubId={match.homeClubId}
            awayClubId={match.awayClubId}
            homeClubName={match.homeClubName}
            awayClubName={match.awayClubName}
          ></MatchResume>
        )}
      </div>
    </div>
  );
};
export default Match;
