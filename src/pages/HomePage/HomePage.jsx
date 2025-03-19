/* eslint-disable no-unused-vars */
// HomePage.jsx
import React, { useState } from "react";
import BackTodayNextButtonCompo from "../../components/BackTodayNextButtonCompo/BackTodayNextButtonCompo";
import FilteredDateShowCompo from "../../components/FilteredDateShowCompo/FilteredDateShowCompo";
import MonthWeekDayAgendaFilter from "../../components/MonthWeekDayAgendaFilter/MonthWeekDayAgendaFilter";
import UserNameDropDownFilter from "../../components/UserNameDropDownFilter/UserNameDropDownFilter";
import WeekWiseCalendarGrid from "../../components/WeekWiseCalendarGrid/WeekWiseCalendarGrid";
import HomePageCalenderCompo from "../../components/HomePageCalenderCompo/HomePageCalenderCompo";
import HomePageSidebarFeatureCompos from "../../components/HomePageSidebarFeatureCompos/HomePageSidebarFeatureCompos";

function HomePage() {
  const [activeView, setActiveView] = useState("Week");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeInterval, setTimeInterval] = useState(15);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(16);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

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
          {activeView === "Week" && (
            <WeekWiseCalendarGrid
              timeInterval={timeInterval}
              setTimeInterval={setTimeInterval}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          )}
        </div>
      </div>
      <div className="col-span-3">
        <HomePageCalenderCompo onDateSelect={handleDateSelect} />
        <HomePageSidebarFeatureCompos
          setTimeInterval={setTimeInterval}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          startTime={startTime}
          endTime={endTime}
          timeInterval={timeInterval}
        />
      </div>
    </div>
  );
}

export default HomePage;
