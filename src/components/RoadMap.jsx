import React, { useState } from "react";
import ELLabsMap from "../Assets/ellabsroadmap1.svg?react";

const levelDescriptions = {
  1: {
    title: "Level 00",
    description: "Introduction to programing basics with Scratch.",
  },
  2: { title: "Level 01", description: "Advanced programing with Scratch" },
  3: {
    title: "Level 02",
    description: "Introduction to Robotics with Scratch",
  },
  4: {
    title: "Level 03",
    description: "Introduction to Robotics with Arduino",
  },
  5: {
    title: "Level 04",
    description: "Introduction to Graphic Design with Inkscape And Gimp",
  },
};

export default function RoadMap() {
  const [hoveredIsland, setHoveredIsland] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (e.target.matches("[id^='island']")) {
      const index = e.target.id.replace("island", "");
      setHoveredIsland(index);
      setPosition({ x: e.pageX + 10, y: e.pageY + 10 }); // Slight offset near the mouse
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.matches("[id^='island']")) {
      setHoveredIsland(null);
    }
  };

  return (
    <div className="relative">
      <ELLabsMap
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {hoveredIsland !== null && (
        <div
          className="absolute bg-white shadow-lg p-2 rounded-md border text-center pointer-events-none transition-opacity duration-200"
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            opacity: hoveredIsland ? 1 : 0,
          }}
        >
          <h2 className="text-sm font-bold text-black">
            {levelDescriptions[hoveredIsland]?.title}
          </h2>
          <p className="text-xs text-gray-600">
            {levelDescriptions[hoveredIsland]?.description}
          </p>
        </div>
      )}

      <style>{`
        [id^='island'] {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        ${
          hoveredIsland !== null
            ? `#island${hoveredIsland} { opacity: 1; }`
            : ""
        }
      `}</style>
    </div>
  );
}
