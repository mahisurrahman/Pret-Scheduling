import React from "react";

function BackTodayNextButtonCompo() {
  return (
    <div className="flex items-center gap-x-2 justify-start">
      <button className="bg-white text-black px-4 py-1 border rounded-sm hover:scale-105 duration-500 hover:duration-500 hover:cursor-pointer">
        Back
      </button>
      <button className="bg-white text-black px-4 py-1 border rounded-sm hover:scale-105 duration-500 hover:duration-500 hover:cursor-pointer">
        Today
      </button>
      <button className="bg-white text-black px-4 py-1 border rounded-sm hover:scale-105 duration-500 hover:duration-500 hover:cursor-pointer">
        Next
      </button>
    </div>
  );
}

export default BackTodayNextButtonCompo;
