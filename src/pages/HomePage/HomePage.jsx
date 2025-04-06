import React, { useState, useEffect } from "react";
import BackTodayNextButtonCompo from "../../components/BackTodayNextButtonCompo/BackTodayNextButtonCompo";
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
    const event = new CustomEvent("dateSelected", {
      detail: { date: date },
    });
    window.dispatchEvent(event);
  };

  const handleBack = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    handleDateSelect(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    handleDateSelect(newDate);
  };

  const handleToday = () => {
    handleDateSelect(new Date());
  };

  const formatDateRange = () => {
    const dayOfWeek = selectedDate.getDay();
    const startOfWeek = new Date(selectedDate);

    startOfWeek.setDate(selectedDate.getDate() - dayOfWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const options = { month: "long", day: "numeric", year: "numeric" };
    const startStr = startOfWeek.toLocaleDateString(undefined, options);
    const endOptions =
      startOfWeek.getFullYear() === endOfWeek.getFullYear()
        ? { month: "long", day: "numeric" }
        : { month: "long", day: "numeric", year: "numeric" };

    const endStr = endOfWeek.toLocaleDateString(undefined, endOptions);
    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="grid grid-cols-12 gap-x-5 px-5 py-5">
      <div className="col-span-9 border-b pb-2">
        <div className="grid grid-cols-3 gap-x-5">
          <BackTodayNextButtonCompo
            onBack={handleBack}
            onToday={handleToday}
            onNext={handleNext}
          />
          <div className="text-center flex items-center justify-center">
            <span className="font-medium">{formatDateRange()}</span>
          </div>
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
              selectedDate={selectedDate}
            />
          )}
        </div>
      </div>
      <div className="col-span-3">
        <HomePageCalenderCompo
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate} 
        />
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
