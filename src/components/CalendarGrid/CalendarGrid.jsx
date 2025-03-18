import React from "react";
import CalenderGridHead from "../CalendarGridHead/CalenderGridHead";
import CalenderGridBody from "../CalendarGridBody/CalenderGridBody";

function CalendarGrid({
  weekDates,
  hoveredCell,
  timeSlots,
  handleCellHover,
  handleCellLeave,
}) {
  return (
    <div className="border rounded border-gray-500 overflow-auto">
      <table className="min-w-full divide-y divide-gray-500">
        <CalenderGridHead hoveredCell={hoveredCell} weekDates={weekDates} />
        <CalenderGridBody
          handleCellHover={handleCellHover}
          handleCellLeave={handleCellLeave}
          hoveredCell={hoveredCell}
          timeSlots={timeSlots}
          weekDates={weekDates}
        />
      </table>
    </div>
  );
}

export default CalendarGrid;
