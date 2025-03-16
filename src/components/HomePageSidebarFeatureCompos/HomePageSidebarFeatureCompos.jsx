import React from "react";

function HomePageSidebarFeatureCompos() {
  return (
    <div className="mt-4 bg-black px-4 py-4">
      <div className="flex items-center gap-x-4">
        <button className="text-xs px-4 py-1 rounded-sm bg-slate-800 text-white font-semibold">
          Type Lists
        </button>
        <button className="text-xs px-4 py-1 rounded-sm bg-slate-800 text-white font-semibold">
          Status
        </button>
        <button className="text-xs px-4 py-1 rounded-sm bg-slate-800 text-white font-semibold">
          Checklist
        </button>
        <button className="text-xs px-4 py-1 rounded-sm bg-slate-800 text-white font-semibold">
          Settings
        </button>
      </div>
    </div>
  );
}

export default HomePageSidebarFeatureCompos;
