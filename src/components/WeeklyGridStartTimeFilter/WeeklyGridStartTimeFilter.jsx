import React from "react";

function WeeklyGridStartTimeFilter({ startTime, handleStartTimeChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white">Start Time</label>
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
  );
}

export default WeeklyGridStartTimeFilter;
