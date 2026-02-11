import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJoueurs } from "../../api/joueurs";
import { getMatchById } from "../../api/matchApi";
import InteractiveTerrain from "../draggable/InteractiveTerrain";

const TeamCompositionPage = () => {
  const { matchId } = useParams();
  const [homePlayers, setHomePlayers] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const match = await getMatchById(matchId); // récupère homeClubId / awayClubId
        const home = await getJoueurs(match.homeClubId);
        const away = await getJoueurs(match.awayClubId);
        setHomePlayers(home);
        setAwayPlayers(away);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [matchId]);

  if (loading) return <p>Chargement des joueurs...</p>;

  return (
   <div style={{ display: "flex", gap: "50px" }}>
  <div>
    <h2>Équipe à domicile</h2>
    <InteractiveTerrain initialPlayers={homePlayers} teamColor="blue" />
  </div>
  <div>
    <h2>Équipe à l'extérieur</h2>
    <InteractiveTerrain initialPlayers={awayPlayers} teamColor="red" />
  </div>
</div>

  );
};

export default TeamCompositionPage;
