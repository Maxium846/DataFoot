import { useEffect, useState } from "react";
import {
  getMatchById,
  getMatchLineup,
  getMatchStatByMatchId,
  
} from "../../api/matchApi";
import { useParams } from "react-router-dom";
import Terrain from "./Terrains";

const MatchDetails = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [lineups, setLineups] = useState([]);
  const [events, setEvents] = useState([]);



  // 🔹 Charger match
  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(matchId);
      setMatch(data);
    };
    fetchMatch();
  }, [matchId]);

  // 🔹 Charger compos
  useEffect(() => {
    if (!match) return;
    const fetchLineups = async () => {
      const data = await getMatchLineup(match.id);
      setLineups(data);
    };
    fetchLineups();
  }, [match]);

  // 🔹 Charger events
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getMatchStatByMatchId(matchId);
      setEvents(data);
    };
    fetchEvents();
  }, [matchId]);


  if (!match) return <p>Chargement du match...</p>;

  const homePlayers = lineups.filter((l) => l.clubId === match.homeClubId && l.starter);
  const awayPlayers = lineups.filter((l) => l.clubId === match.awayClubId && l.starter);

  

 const homeGoals = events.filter(
  (e) =>
    (e.eventType === "GOAL" || e.eventType === "PENALTY_GOAL" || e.eventType === "OWN_GOAL") &&
    e.clubId === match.homeClubId
);

const awayGoals = events.filter(
  (e) =>
    (e.eventType === "GOAL" || e.eventType === "PENALTY_GOAL" || e.eventType === "OWN_GOAL") &&
    e.clubId === match.awayClubId
);

  return (
    <div>
      <h2>
        {match.homeClubName} {homeGoals.length} - {awayGoals.length} {match.awayClubName}
      </h2>
      <p>{match.status}</p>

      {/* 🔹 Liste des buteurs */}
      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <strong>{match.homeClubName} :</strong>
          <ul>
            {homeGoals.map((g, i) => {
              const player = lineups.find((p) => p.playerId === g.playerId);
              return <li key={i}>{player?.playerName} ({g.minutes}')</li>;
            })}
          </ul>
        </div>

        <div>
          <strong>{match.awayClubName} :</strong>
          <ul>
            {awayGoals.map((g, i) => {
              const player = lineups.find((p) => p.playerId === g.playerId);
              return <li key={i}>{player?.playerName} ({g.minutes}')</li>;
            })}
          </ul>
        </div>
      </div>

      {/* 🔹 Terrain */}
      <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
        <Terrain players={homePlayers} teamColor="blue" events={events} />
        <Terrain players={awayPlayers} teamColor="red" events={events} />
      </div>

  
      

     
    </div>
  );
};

export default MatchDetails;
