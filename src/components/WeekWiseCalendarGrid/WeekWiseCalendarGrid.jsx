import React, { useState } from "react";
import WeeklyGridTimeIntervalFilter from "../WeeklyGridTimeIntervalFilter/WeeklyGridTimeIntervalFilter";
import WeeklyGridStartTimeFilter from "../WeeklyGridStartTimeFilter/WeeklyGridStartTimeFilter";
import WeeklyGridEndTimeFilter from "../WeeklyGridEndTimeFilter/WeeklyGridEndTimeFilter";
import CalendarGrid from "../CalendarGrid/CalendarGrid";

const WeekWiseCalendarGrid = ({
  timeInterval,
  setTimeInterval,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) => {
  const [hoveredCell, setHoveredCell] = useState({ row: null, col: null });

  const today = new Date();
  const dayOfWeek = today.getDay();

  // Generate week dates starting from Sunday
  const generateWeekDates = () => {
    const dates = [];
    const startDate = new Date(today);
    // Go back to Sunday
    startDate.setDate(today.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push({
        date: date.getDate(),
        day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
      });
    }
    return dates;
  };

  const weekDates = generateWeekDates();

  // Generate time slots based on interval
  const generateTimeSlots = () => {
    const slots = [];
    const totalMinutes = (endTime - startTime) * 60;
    const slotCount = totalMinutes / timeInterval;

    for (let i = 0; i <= slotCount; i++) {
      const minutes = i * timeInterval;
      const hour = Math.floor(minutes / 60) + startTime;
      const minute = minutes % 60;

      // Format time to AM/PM
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const formattedMinute = minute.toString().padStart(2, "0");

      slots.push(`${formattedHour}:${formattedMinute} ${period}`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleIntervalChange = (e) => {
    setTimeInterval(parseInt(e.target.value));
  };

  const handleStartTimeChange = (e) => {
    setStartTime(parseInt(e.target.value));
  };

  const handleEndTimeChange = (e) => {
    setEndTime(parseInt(e.target.value));
  };

  const handleCellHover = (rowIndex, colIndex) => {
    setHoveredCell({ row: rowIndex, col: colIndex });
  };

  const handleCellLeave = () => {
    setHoveredCell({ row: null, col: null });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="mb-4 flex space-x-4">
        <WeeklyGridTimeIntervalFilter
          handleIntervalChange={handleIntervalChange}
          timeIn
          terval={timeInterval}
        />

        <WeeklyGridStartTimeFilter
          handleStartTimeChange={handleStartTimeChange}
          startTime={startTime}
        />

        <WeeklyGridEndTimeFilter
          endTime={endTime}
          handleEndTimeChange={handleEndTimeChange}
        />
      </div>

      {/* Calendar Grid */}
      <CalendarGrid
        weekDates={weekDates}
        handleCellHover={handleCellHover}
        handleCellLeave={handleCellLeave}
        hoveredCell={hoveredCell}
        timeSlots={timeSlots}
      />
    </div>
  );
};

export default WeekWiseCalendarGrid;
