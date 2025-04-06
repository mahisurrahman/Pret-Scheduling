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

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const handleSelectedDateChange = (event) => {
      if (event && event.detail) {
        setSelectedDate(event.detail.date);
      }
    };

    window.addEventListener("dateSelected", handleSelectedDateChange);
    generateWeekDates(new Date());

    return () => {
      window.removeEventListener("dateSelected", handleSelectedDateChange);
    };
  }, []);

  const generateWeekDates = (date) => {
    const dayOfWeek = date.getDay(); 
    const startDate = new Date(date);
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
        fullDate: new Date(currentDate), 
      });
    }

    setCurrentWeekDates(dates);
  };


  useEffect(() => {
    generateWeekDates(selectedDate);
  }, [selectedDate]);

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


  const generateTimeSlots = () => {
    const slots = [];
    const totalMinutes = (endTime - startTime) * 60;
    const slotCount = totalMinutes / timeInterval;

    for (let i = 0; i <= slotCount; i++) {
      const minutes = i * timeInterval;
      const hour = Math.floor(minutes / 60) + startTime;
      const minute = minutes % 60;


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
