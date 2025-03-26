import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomePageCalenderCompo = ({
  onDateSelect,
  selectedDate: parentSelectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    parentSelectedDate || new Date()
  );

  // Add this effect to sync with parent's selectedDate
  useEffect(() => {
    if (parentSelectedDate) {
      setSelectedDate(parentSelectedDate);

      // If the selected date is in a different month, update the calendar view
      if (
        parentSelectedDate.getMonth() !== currentDate.getMonth() ||
        parentSelectedDate.getFullYear() !== currentDate.getFullYear()
      ) {
        setCurrentDate(
          new Date(
            parentSelectedDate.getFullYear(),
            parentSelectedDate.getMonth(),
            1
          )
        );
      }
    }
  }, [parentSelectedDate, currentDate]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateClick = (day) => {
    // Create new date object with selected day
    const newSelectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newSelectedDate);

    // Call the onDateSelect prop with the new date
    if (onDateSelect) {
      onDateSelect(newSelectedDate);
    }
  };

  // Generate calendar days
  const days = [];
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear();

    const isSelected =
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear();

    days.push(
      <div
        key={day}
        className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer 
                   hover:bg-blue-700 ${isToday ? "bg-black" : ""} 
                   ${isSelected ? "bg-blue-500" : ""}`}
        onClick={() => handleDateClick(day)}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="p-4 bg-black rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          {monthName} {currentYear}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-1 rounded hover:bg-gray-200 hover:text-gray-900"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 rounded hover:bg-gray-200 hover:text-gray-900"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="font-medium text-gray-500 text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">{days}</div>
    </div>
  );
};

export default HomePageCalenderCompo;
