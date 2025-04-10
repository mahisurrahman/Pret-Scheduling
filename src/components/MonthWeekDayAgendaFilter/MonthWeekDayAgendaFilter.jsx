import React from "react";

function MonthWeekDayAgendaFilter({ activeView, setActiveView }) {
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const getButtonStyles = (view) => {
    const baseStyles =
      "px-4 py-1 border rounded-sm hover:cursor-pointer transition-all duration-500 ";

    if (activeView === view) {
      return (
        baseStyles +
        "bg-slate-800 text-white font-medium border-slate-800 hover:scale-105"
      );
    } else {
      return baseStyles + "bg-white text-black hover:scale-105";
    }
  };

  return (
    <div className="flex items-center justify-end gap-x-2">
      <button
        className={getButtonStyles("Month")}
        onClick={() => handleViewChange("Month")}
      >
        Month
      </button>
      <button
        className={getButtonStyles("Week")}
        onClick={() => handleViewChange("Week")}
      >
        Week
      </button>
      <button
        className={getButtonStyles("Day")}
        onClick={() => handleViewChange("Day")}
      >
        Day
      </button>
      <button
        className={getButtonStyles("Agenda")}
        onClick={() => handleViewChange("Agenda")}
      >
        Agenda
      </button>
    </div>
  );
}

export default MonthWeekDayAgendaFilter;
