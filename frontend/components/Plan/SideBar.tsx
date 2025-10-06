"use client";
import React from "react";
import { Calendar } from "../ui/calendar";
import { useCurrDate } from "@/context/CurrDateContext";

const SideBar = () => {
  const { selectedDate, setSelectedDate } = useCurrDate();
  const handleDateChange = (date: Date | undefined) => {
    // Only update if a valid date is selected
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className=" w-[20%] hidden lg:block mt-20 p-2 sticky top-20 h-full">
      <div className=" h-full w-full rounded-2xl p-1">
        <Calendar
          mode="single"
          className=" w-full rounded-2xl border border-border"
          selected={selectedDate}
          onSelect={handleDateChange}
        />
      </div>
    </div>
  );
};

export default SideBar;
