// HomePage.jsx
import React, { useState } from "react";
import BackTodayNextButtonCompo from "../../components/BackTodayNextButtonCompo/BackTodayNextButtonCompo";
import FilteredDateShowCompo from "../../components/FilteredDateShowCompo/FilteredDateShowCompo";
import MonthWeekDayAgendaFilter from "../../components/MonthWeekDayAgendaFilter/MonthWeekDayAgendaFilter";
import UserNameDropDownFilter from "../../components/UserNameDropDownFilter/UserNameDropDownFilter";
import WeekWiseCalendarGrid from "../../components/WeekWiseCalendarGrid/WeekWiseCalendarGrid";

function HomePage() {
  const [activeView, setActiveView] = useState("Week"); // Default to Week view

  return (
    <div className="grid grid-cols-12 gap-x-5 px-5 py-5">
      <div className="col-span-9 border-b pb-2">
        <div className="grid grid-cols-3 gap-x-5">
          <BackTodayNextButtonCompo />
          <FilteredDateShowCompo />
          <MonthWeekDayAgendaFilter
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>

        <div className="mt-2 w-full flex items-center justify-center">
          <UserNameDropDownFilter />
        </div>

        <div className="mt-2 w-full flex items-center justify-center">
          {activeView === "Week" && <WeekWiseCalendarGrid />}
          {/* Add other views later as needed */}
        </div>
      </div>
      <div className="col-span-3"></div>
    </div>
  );
}

export default HomePage;
