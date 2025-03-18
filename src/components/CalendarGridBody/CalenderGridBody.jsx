import React from "react";

function CalenderGridBody({
  timeSlots,
  hoveredCell,
  weekDates,
  handleCellHover,
  handleCellLeave,
}) {
  return (
    <tbody className="divide-y divide-gray-500">
      {timeSlots.map((timeSlot, rowIndex) => (
        <tr
          key={rowIndex}
          className={
            hoveredCell.row === rowIndex
              ? "bg-gray-800 text-white"
              : "bg-transparent text-white"
          }
        >
          <td className="px-4 py-1 border-r bg-black border-gray-500 font-medium text-sm text-white">
            {timeSlot}
          </td>
          {weekDates.map((_, colIndex) => {
            const isHoveredCell =
              hoveredCell.row === rowIndex && hoveredCell.col === colIndex;
            const isHoveredColumn =
              hoveredCell.col === colIndex && hoveredCell.row !== null;

            return (
              <td
                key={colIndex}
                className={`px-2 py-1 border-r text-center border-gray-500 text-sm text-white relative
                  ${isHoveredCell ? "bg-gray-800 hover:cursor-pointer" : ""}
                  ${!isHoveredCell && isHoveredColumn ? "bg-gray-800" : ""}
                `}
                onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
                onMouseLeave={handleCellLeave}
              >
                {/* Show time as placeholder when hovered */}
                {isHoveredCell && (
                  <span className="text-gray-200 ">{timeSlot}</span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default CalenderGridBody;
