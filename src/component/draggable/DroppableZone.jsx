import { useDroppable } from "@dnd-kit/core";
import React from "react";

const DroppableZone = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: "100px",
        border: isOver ? "2px dashed #007bff" : "2px dashed #ccc",
        padding: "8px",
        margin: "8px 0",
        borderRadius: "6px",
        backgroundColor: isOver ? "#e0f0ff" : "#f8f8f8",
      }}
    >
      {children}
    </div>
  );
};

export default DroppableZone;
