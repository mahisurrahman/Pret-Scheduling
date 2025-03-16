import React from "react";

function UserNameDropDownFilter() {
  return (
    <select className="w-2/12 bg-gray-700 text-white px-4 py-1 rounded-sm border border-gray-600 appearance-auto cursor-pointer">
      <option value="Meeting" className="bg-gray-700 text-white">
        Taika Ahmed Watti
      </option>
      <option value="Phone Call" className="bg-gray-700 text-white">
        Phone Call
      </option>
      <option value="Email" className="bg-gray-700 text-white">
        Email
      </option>
      <option value="Task" className="bg-gray-700 text-white">
        Task
      </option>
      <option value="Personal" className="bg-gray-700 text-white">
        Personal
      </option>
      <option value="Conference" className="bg-gray-700 text-white">
        Conference
      </option>
      <option value="Lunch" className="bg-gray-700 text-white">
        Lunch
      </option>
    </select>
  );
}

export default UserNameDropDownFilter;
