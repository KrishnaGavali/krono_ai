"use client";
import React, { useEffect } from "react";
import { Calendar } from "../ui/calendar";
import { useCurrDate } from "@/context/CurrDateContext";
import { isSameDay } from "date-fns";

const SideBar = () => {
  const { selectedDate, setSelectedDate } = useCurrDate();
  const handleDateChange = (date: Date | undefined) => {
    // Only update if a valid date is selected
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    console.log(selectedDate, "changed");
  }, [selectedDate]);

  return (
    <div className=" w-[20%] hidden lg:block mt-20 p-2 sticky top-20 h-full">
      <div className=" h-full w-full rounded-2xl p-1">
        <Calendar
          mode="single"
          className=" w-full rounded-2xl border border-border"
          selected={
            isSameDay(new Date(), selectedDate) ? undefined : selectedDate
          }
          onSelect={handleDateChange}
          month={selectedDate}
        />
      </div>
    </div>
  );
};

export default SideBar;
