import React from "react";

function WeeklyGridEndTimeFilter({ endTime, handleEndTimeChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white">End Time</label>
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
  );
}

export default WeeklyGridEndTimeFilter;
