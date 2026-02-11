import React from "react";

/**
 * Retourne un tableau de positions x pour N joueurs alignés horizontalement
 * @param {number} numPlayers - nombre de joueurs
 * @param {number} y - position verticale en %
 */
const getPositions = (numPlayers, y) => {
  const step = 100 / (numPlayers + 1);
  return Array.from({ length: numPlayers }, (_, i) => ({
    x: step * (i + 1),
    y,
  }));
};

/**
 * Terrain de football dynamique
 * @param {Array} players - tableau de joueurs { playerId, playerName, position, starter }
 * @param {string} teamColor - couleur de l'équipe
 */
const Terrain = ({ players, teamColor = "blue" }) => {
  // Séparer les joueurs par poste
  const positionsY = {
    Goalkeeper: 90,
    Defender: 70,
    Midfielder: 50,
    Forward: 30,
  };

  // regrouper les joueurs par poste
  const playersByPosition = {};
  players.forEach((p) => {
    if (!playersByPosition[p.position]) playersByPosition[p.position] = [];
    playersByPosition[p.position].push(p);
  });

  // Créer une liste avec coordonnées pour chaque joueur
  const placedPlayers = [];
  Object.keys(playersByPosition).forEach((pos) => {
    const y = positionsY[pos] || 50; // fallback
    const coords = getPositions(playersByPosition[pos].length, y);

    playersByPosition[pos].forEach((p, i) => {
      placedPlayers.push({ ...p, coord: coords[i] });
    });
  });

  return (
    <div
      style={{
        width: "500px",
        height: "700px",
        backgroundColor: "#0b7a36",
        position: "relative",
        border: "2px solid white",
        borderRadius: "10px",
      }}
    >
      {placedPlayers.map((p) => (
        <div
          key={p.playerId}
          style={{
            position: "absolute",
            top: `${p.coord.y}%`,
            left: `${p.coord.x}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: teamColor,
            color: "white",
            padding: "5px 10px",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "12px",
            whiteSpace: "nowrap",
            textAlign: "center",
            zIndex: 10,
          }}
          title={`${p.playerName} (${p.position})`}
        >
          {p.playerName}
        </div>
      ))}
    </div>
  );
};

export default Terrain;
