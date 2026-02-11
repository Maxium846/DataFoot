import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMatchById, saveMatchLineup } from "../../api/matchApi";
import { getJoueurs } from "../../api/joueurs";

const MatchLineUpForm = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [homePlayers, setHomePlayers] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [lineups, setLineups] = useState({}); // { playerId: { clubId, position, starter } }

  // 🔹 Récupérer le match
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const m = await getMatchById(matchId);
        setMatch(m);
      } catch (err) {
        console.error("Erreur récupération match :", err);
      }
    };
    fetchMatch();
  }, [matchId]);

  // 🔹 Récupérer les joueurs et initialiser lineups
  useEffect(() => {
    if (!match) return;

    const fetchPlayers = async () => {
      try {
        const home = await getJoueurs(match.homeClubId);
        const away = await getJoueurs(match.awayClubId);
        setHomePlayers(home);
        setAwayPlayers(away);

        // 🔹 Initialisation lineups avec clubId
        const initialLineups = {};
        home.forEach((p) => {
          initialLineups[p.id] = {
            clubId: match.homeClubId,
            position: p.position,
            starter: false,
          };
        });
        away.forEach((p) => {
          initialLineups[p.id] = {
            clubId: match.awayClubId,
            position: p.position,
            starter: false,
          };
        });
        setLineups(initialLineups);
      } catch (err) {
        console.error("Erreur récupération joueurs :", err);
      }
    };

    fetchPlayers();
  }, [match]);

  // 🔹 Mettre à jour starter ou position
  const handleChange = (playerId, field, value) => {
    setLineups((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: value,
      },
    }));
  };

  // 🔹 Envoi au back
  const handleSubmit = async (e) => {
    e.preventDefault();

    const lineupArray = Object.entries(lineups).map(([playerId, data]) => ({
      matchId: match.id,
      playerId: Number(playerId),
      clubId: data.clubId, // ✅ Toujours présent
      position: data.position || "Unknown",
      starter: data.starter ?? true,
    }));

    try {
      console.log("Envoi au back :", lineupArray);
      await saveMatchLineup({ matchId: match.id, lineups: lineupArray });
      alert("Composition enregistrée !");
    } catch (err) {
      console.error("Erreur sauvegarde lineup :", err);
      alert("Erreur lors de la sauvegarde.");
    }
  };

  if (!match) return <p>Chargement du match...</p>;

  const teams = [
    { players: homePlayers, clubId: match.homeClubId, name: match.homeClubName },
    { players: awayPlayers, clubId: match.awayClubId, name: match.awayClubName },
  ];

  return (
    <div>
      <h2>
        Composition Match : {match.homeClubName} vs {match.awayClubName}
      </h2>

      <form onSubmit={handleSubmit}>
        {teams.map(({ players, clubId, name }) => (
          <div key={clubId} style={{ marginBottom: "20px" }}>
            <h3>{name}</h3>
            {players.map((player) => (
              <div key={player.id} style={{ marginBottom: "5px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={lineups[player.id]?.starter || false}
                    onChange={(e) =>
                      handleChange(player.id, "starter", e.target.checked)
                    }
                  />
                  {player.firstName} {player.lastName} ({player.position})
                </label>

                <select
                  value={lineups[player.id]?.position || player.position}
                  onChange={(e) =>
                    handleChange(player.id, "position", e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                >
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
              </div>
            ))}
          </div>
        ))}

        <button type="submit">Enregistrer composition</button>
      </form>
    </div>
  );
};

export default MatchLineUpForm;
