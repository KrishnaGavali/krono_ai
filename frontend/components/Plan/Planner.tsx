"use client";
import React, { useState, useEffect } from "react";
import TimeColumn from "./TimeColumn";
import PlanGrid from "./DayGrid";
import { useCurrDate } from "@/context/CurrDateContext";

const Planner = () => {
  const [daysToShow, setDaysToShow] = useState(7);
  const { selectedDate } = useCurrDate();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: show 1 day
        setDaysToShow(1);
      } else if (width < 1024) {
        // Tablet: show 3 days
        setDaysToShow(3);
      } else {
        // Desktop: show 7 days
        setDaysToShow(7);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate dates starting from today
  const generateDates = (count: number, date: Date | null) => {
    const dates = [];
    const currDate = new Date(selectedDate);

    for (let i = -(daysToShow / 2) + 1; i < daysToShow / 2 + 1; i++) {
      const date = new Date(currDate);
      date.setDate(currDate.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates(daysToShow, selectedDate);

  return (
    <div className="flex flex-1">
      <TimeColumn />
      <div className=" flex-1 flex">
        {dates.map((date, index) => (
          <PlanGrid key={`day-${index}`} date={date} />
        ))}
      </div>
    </div>
  );
};

export default Planner;
