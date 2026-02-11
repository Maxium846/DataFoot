import { useEffect, useState } from "react";
import { getMatchLineup } from "../../api/matchApi";
import Terrain from "./Terrains";

const MatchDetails = ({ match }) => {
  const [lineups, setLineups] = useState([]);
  

  useEffect(() => {
    if (!match) return;

    const fetch = async () => {
      const data = await getMatchLineup(match.id);
      setLineups(data);
    };

    fetch();
  }, [match]);

  if (!match) return null;

  const homePlayers = lineups.filter(l => l.clubId === match.homeClubId && l.starter);
  const awayPlayers = lineups.filter(l => l.clubId === match.awayClubId && l.starter);

  return (
    <div>
      <h2>
        {match.homeClubName} {match.homeGoals} - {match.awayGoals} {match.awayClubName}
      </h2>

      <div style={{ display: "flex", gap: "40px" }}>
        <Terrain players={homePlayers} />
        <Terrain players={awayPlayers} />
      </div>
    </div>
  );
};

export default MatchDetails;
