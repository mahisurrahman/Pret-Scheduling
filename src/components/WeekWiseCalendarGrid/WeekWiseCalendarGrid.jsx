import React, { useState } from "react";

const WeekWiseCalendarGrid = () => {
  const [timeInterval, setTimeInterval] = useState(15);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(16);
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
        <div>
          <label className="block text-sm font-medium text-white">
            Time Interval
          </label>
          <select
            value={timeInterval}
            onChange={handleIntervalChange}
            className="mt-1 block w-full pl-3 pr-10 py-1 text-base bg-slate-800 no-scrollbar rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={2}>2 Minutes</option>
            <option value={5}>5 Minutes</option>
            <option value={10}>10 Minutes</option>
            <option value={15}>15 Minutes</option>
            <option value={30}>30 Minutes</option>
            <option value={60}>1 Hour</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Start Time
          </label>
          <select
            value={startTime}
            onChange={handleStartTimeChange}
            className="mt-1 block w-full pl-3 pr-10 py-1 text-base bg-slate-800 no-scrollbar rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {i > 12 ? i - 12 : i} {i >= 12 ? "PM" : "AM"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            End Time
          </label>
          <select
            value={endTime}
            onChange={handleEndTimeChange}
            className="mt-1 bg-slate-800 block w-full pl-3 pr-10 py-1 text-base scrollbar rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 no-scrollbar"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {i > 12 ? i - 12 : i} {i >= 12 ? "PM" : "AM"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded border-gray-500 overflow-auto">
        <table className="min-w-full divide-y divide-gray-500">
          <thead>
            <tr>
              <th className="px-4 py-1 text-white text-left w-24"></th>
              {weekDates.map((date, index) => (
                <th
                  key={index}
                  className={`px-4 py-1 text-white text-center ${
                    hoveredCell.col === index ? "bg-gray-800" : ""
                  }`}
                >
                  {date.date} {date.day}
                </th>
              ))}
            </tr>
          </thead>
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
                    hoveredCell.row === rowIndex &&
                    hoveredCell.col === colIndex;
                  const isHoveredColumn =
                    hoveredCell.col === colIndex && hoveredCell.row !== null;

                  return (
                    <td
                      key={colIndex}
                      className={`px-2 py-1 border-r text-center border-gray-500 text-sm text-white relative
                        ${isHoveredCell ? "bg-gray-800 " : ""}
                        ${
                          !isHoveredCell && isHoveredColumn ? "bg-gray-800" : ""
                        }
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
        </table>
      </div>
    </div>
  );
};

export default WeekWiseCalendarGrid;
