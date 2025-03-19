import React, { useState, useEffect } from "react";
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
  const [currentWeekDates, setCurrentWeekDates] = useState([]);

  // Get the current date from the parent component
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Listen for changes in selected date from parent component
  useEffect(() => {
    const handleSelectedDateChange = (event) => {
      if (event && event.detail) {
        setSelectedDate(event.detail.date);
      }
    };

    window.addEventListener("dateSelected", handleSelectedDateChange);

    // Generate week dates on mount and when selected date changes
    generateWeekDates(new Date());

    return () => {
      window.removeEventListener("dateSelected", handleSelectedDateChange);
    };
  }, []);

  // Generate week dates starting from Sunday of the week containing the selected date
  const generateWeekDates = (date) => {
    const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const startDate = new Date(date);

    // Go back to Sunday (start of week)
    startDate.setDate(date.getDate() - dayOfWeek);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      dates.push({
        date: currentDate.getDate(),
        day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
          currentDate.getDay()
        ],
        fullDate: new Date(currentDate), // Keep full date for reference
      });
    }

    setCurrentWeekDates(dates);
  };

  // Re-generate week dates when selected date changes
  useEffect(() => {
    generateWeekDates(selectedDate);
  }, [selectedDate]);

  // Listen for date selection events from parent
  useEffect(() => {
    const handleDateSelected = (event) => {
      if (event.detail && event.detail.date) {
        generateWeekDates(event.detail.date);
      }
    };

    window.addEventListener("dateSelected", handleDateSelected);
    return () => {
      window.removeEventListener("dateSelected", handleDateSelected);
    };
  }, []);

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

  const handleCellHover = (rowIndex, colIndex) => {
    setHoveredCell({ row: rowIndex, col: colIndex });
  };

  const handleCellLeave = () => {
    setHoveredCell({ row: null, col: null });
  };

  return (
    <div className="w-full flex flex-col">
      {/* Calendar Grid */}
      <CalendarGrid
        weekDates={currentWeekDates}
        handleCellHover={handleCellHover}
        handleCellLeave={handleCellLeave}
        hoveredCell={hoveredCell}
        timeSlots={timeSlots}
      />
    </div>
  );
};

export default WeekWiseCalendarGrid;
