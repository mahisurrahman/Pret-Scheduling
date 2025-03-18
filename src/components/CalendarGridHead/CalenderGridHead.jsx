import React from "react";

function CalenderGridHead({ weekDates, hoveredCell }) {
  return (
    <thead>
      <tr>
        <th className="px-4 py-1 text-white bg-black border-r border-gray-500 text-left w-24"></th>
        {weekDates.map((date, index) => (
          <th
            key={index}
            className={`px-4 py-1 text-white bg-black border-r border-gray-500 text-center ${
              hoveredCell.col === index ? "bg-gray-800" : ""
            }`}
          >
            {date.date} {date.day}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default CalenderGridHead;
