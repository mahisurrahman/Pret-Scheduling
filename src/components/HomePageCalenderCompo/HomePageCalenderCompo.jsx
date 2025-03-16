// First, create a new Calendar component
// src/components/Calendar/Calendar.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomePageCalenderCompo = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear();

    days.push(
      <div
        key={day}
        className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer 
                   hover:bg-blue-700 ${isToday ? "bg-black" : ""}`}
        onClick={() =>
          onDateSelect && onDateSelect(new Date(currentYear, currentMonth, day))
        }
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
          <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-200">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-200">
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
