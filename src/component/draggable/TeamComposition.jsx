import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import DraggablePlayer from "./DraggablePlayer";
import DroppableZone from "./DroppableZone";

const TeamComposition = ({ players, onSave }) => {
  const [starters, setStarters] = useState([]);
  const [bench, setBench] = useState(players);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const player = active.data.current;

    // si le joueur vient du banc et tombe sur le terrain
    if (bench.find((p) => p.playerId === player.playerId)) {
      setStarters((prev) => [...prev, { ...player, starter: true }]);
      setBench((prev) =>
        prev.filter((p) => p.playerId !== player.playerId)
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <h2>Terrain</h2>
      <DroppableZone id="terrain">
        {starters.map((p) => (
          <div key={p.playerId}>{p.playerName}</div>
        ))}
      </DroppableZone>

      <h2>Banc / Joueurs disponibles</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {bench.map((p) => (
          <DraggablePlayer key={p.playerId} player={p} />
        ))}
      </div>

      <button
        onClick={() => onSave(starters)}
        style={{ marginTop: "20px", padding: "8px 12px" }}
      >
        Enregistrer composition
      </button>
    </DndContext>
  );
};

export default TeamComposition;
