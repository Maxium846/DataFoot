import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Génère les positions x pour N joueurs alignés horizontalement
 */
const getLinePositions = (numPlayers, y) => {
  const step = 100 / (numPlayers + 1);
  return Array.from({ length: numPlayers }, (_, i) => ({
    x: step * (i + 1),
    y,
  }));
};

/**
 * Terrain de foot compact style FlashScore avec nom complet
 */
const FootballPitch = ({ players = [], teamColor = "#1E90FF" }) => {
  const navigate = useNavigate(); // 🔑 hook pour la navigation

  // positions Y pour chaque poste
  const positionsY = {
    Goalkeeper: 90,
    Defender: 70,
    Midfielder: 50,
    Forward: 30,
  };

  // regrouper les joueurs par poste
  const playersByPosition = {};
  players.forEach((p) => {
    const pos = p.position || "Midfielder";
    if (!playersByPosition[pos]) playersByPosition[pos] = [];
    playersByPosition[pos].push(p);
  });

  // assigner coordonnées à chaque joueur
  const placedPlayers = [];
  Object.keys(playersByPosition).forEach((pos) => {
    const y = positionsY[pos] ?? 50;
    const coords = getLinePositions(playersByPosition[pos].length, y);
    playersByPosition[pos].forEach((p, i) => {
      placedPlayers.push({ ...p, coord: coords[i] });
    });
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        aspectRatio: "5/7",
        backgroundColor: "#3CB371",
        position: "relative",
        border: "2px solid white",
        borderRadius: "5px",
        margin: "0 auto",
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        overflow: "hidden",
      }}
    >
      {/* Cercle central */}
      <div
        style={{
          position: "absolute",
          width: "20%",
          height: "10%",
          top: "45%",
          left: "40%",
          border: "2px solid white",
          borderRadius: "50%",
        }}
      />
      {/* Surfaces de reparation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "25%",
          width: "50%",
          height: "15%",
          border: "2px solid white",
          borderBottom: "none",
          borderTop: "2px solid white",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "25%",
          width: "50%",
          height: "15%",
          border: "2px solid white",
          borderTop: "2px solid white",
        }}
      />
      {/* Ligne Réparation gardien */}


      <div
       style={{
          position: "absolute",
          top: 0,
          left: "33%",
          width: "35%",
          height: "5%",
          border: "2px solid white",
          borderBottom: "2px solid white",
          borderTop: "2px solid white",
        }}></div>
          <div
       style={{
          position: "absolute",
          bottom: 0,
          left: "33%",
          width: "35%",
          height: "5%",
          border: "2px solid white",
          borderBottom: "2px solid white",
          borderTop: "2px solid white",
        }}></div>
      {/* Ligne médiane */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: 0,
          borderTop: "2px solid white",
        }}
      />

      {/* Joueurs */}
      {placedPlayers.map((p) => (
        <div
          key={p.playerId}
          style={{
            position: "absolute",
            top: `${p.coord.y}%`,
            left: `${p.coord.x}%`,
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: teamColor,
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "9px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "2px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            cursor: "pointer",
            overflow: "hidden",
          }}
          title={`${p.playerName} (${p.position})`}
          onClick={() => navigate(`/joueurs/${p.clubId}/${p.playerId}`)} // 🔑 navigation
        >
          {p.playerName} {/* nom complet */}
        </div>
      ))}
    </div>
  );
};

export default FootballPitch;
