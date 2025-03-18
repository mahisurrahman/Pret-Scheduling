import React, { useState } from "react";

const SettingsPanel = () => {
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(17);
  const [minutesPerSlot, setMinutesPerSlot] = useState(15);
  const [defaultView, setDefaultView] = useState("Week");
  const [customDays, setCustomDays] = useState({
    Sunday: true,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true
  });

  const handleStartTimeChange = (e) => {
    setStartTime(parseInt(e.target.value));
  };

  const handleEndTimeChange = (e) => {
    setEndTime(parseInt(e.target.value));
  };

  const handleMinutesPerSlotChange = (e) => {
    setMinutesPerSlot(parseInt(e.target.value));
  };

  const handleDefaultViewChange = (e) => {
    setDefaultView(e.target.value);
  };

  const handleDayToggle = (day) => {
    setCustomDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleReset = () => {
    setStartTime(9);
    setEndTime(17);
    setMinutesPerSlot(15);
    setDefaultView("Week");
    setCustomDays({
      Sunday: true,
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true
    });
  };

  const handleUpdate = () => {
    // Here you would implement the logic to save these settings
    console.log("Settings updated:", {
      startTime,
      endTime,
      minutesPerSlot,
      defaultView,
      customDays
    });
    // You might want to pass these values up to parent components
  };

  return (
    <div className="bg-black text-white p-4">
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleReset}
          className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700"
        >
          RESET
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm">Start Time (24 H Format)</label>
          <select 
            value={startTime} 
            onChange={handleStartTimeChange}
            className="w-full bg-gray-800 text-white p-2 rounded"
          >
            {[...Array(24)].map((_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">End Time (24 H Format)</label>
          <select 
            value={endTime} 
            onChange={handleEndTimeChange}
            className="w-full bg-gray-800 text-white p-2 rounded"
          >
            {[...Array(24)].map((_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Minutes Per Slot</label>
        <select 
          value={minutesPerSlot} 
          onChange={handleMinutesPerSlotChange}
          className="w-full bg-gray-800 text-white p-2 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Default View</label>
        <select 
          value={defaultView} 
          onChange={handleDefaultViewChange}
          className="w-full bg-gray-800 text-white p-2 rounded"
        >
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
          <option value="Agenda">Agenda</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Custom Days</label>
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(customDays).map(day => (
            <div key={day} className="flex items-center">
              <input 
                type="checkbox" 
                id={day}
                checked={customDays[day]}
                onChange={() => handleDayToggle(day)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <label htmlFor={day} className="text-white">{day}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button 
          onClick={handleUpdate}
          className="bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-500"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;