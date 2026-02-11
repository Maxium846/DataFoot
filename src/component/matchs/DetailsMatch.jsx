import { useEffect, useState } from "react";
import { getMatchById, getMatchLineup } from "../../api/matchApi";
import { useParams } from "react-router-dom";
import Terrain from "./Terrains";

const MatchDetails = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [lineups, setLineups] = useState([]);

  // 🔹 récupérer les infos du match
  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(matchId);
      setMatch(data);
    };
    fetchMatch();
  }, [matchId]);

  // 🔹 récupérer les compos
  useEffect(() => {
    if (!match) return;

    const fetchLineups = async () => {
      const data = await getMatchLineup(match.id);
      console.log(data);
      setLineups(data);
    };
    fetchLineups();
  }, [match]);

  if (!match) return <p>Chargement du match...</p>;

  const homePlayers = lineups.filter(
    (l) => l.clubId === match.homeClubId && l.starter,
  );
  const awayPlayers = lineups.filter(
    (l) => l.clubId === match.awayClubId && l.starter,
  );
  console.log("Home players:", homePlayers);
  console.log("Away players:", awayPlayers);

  return (
    <div>
      <h2>
        {match.homeClubName} {match.homeGoals ?? 0} - {match.awayGoals ?? 0}{" "}
        {match.awayClubName}
      </h2>

      <div style={{ display: "flex", gap: "40px" }}>
        <Terrain players={homePlayers} teamColor="blue" />
        <Terrain players={awayPlayers} teamColor="red" />
      </div>
    </div>
  );
};

export default MatchDetails;
