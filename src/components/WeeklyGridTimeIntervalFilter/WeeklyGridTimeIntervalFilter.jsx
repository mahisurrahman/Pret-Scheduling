import React from "react";

function WeeklyGridTimeIntervalFilter({timeInterval,handleIntervalChange}) {
  return (
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
  );
}

export default WeeklyGridTimeIntervalFilter;
