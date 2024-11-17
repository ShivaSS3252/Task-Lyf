import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, title, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: isOver ? "#f0f4ff" : "#e2e6f0",
        width: "350px",
        minHeight: "300px", // Minimum height of each Droppable
        overflowY: "auto", // Allow scrolling if content overflows
        marginBottom: "20px", // Add some space between the Droppables
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};
