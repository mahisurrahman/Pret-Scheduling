import React from "react";

function BackTodayNextButtonCompo({ onBack, onToday, onNext }) {
  return (
    <div className="flex justify-start items-center space-x-2">
      <button
        onClick={onBack}
        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
      >
        Back
      </button>

      <button
        onClick={onToday}
        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
      >
        Today
      </button>

      <button
        onClick={onNext}
        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
      >
        Next
      </button>
    </div>
  );
}

export default BackTodayNextButtonCompo;
