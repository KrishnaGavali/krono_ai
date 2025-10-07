"use client";
import React, { useState, useEffect } from "react";
import TimeColumn from "./TimeColumn";
import PlanGrid from "./DayGrid";
import { useCurrDate } from "@/context/CurrDateContext";

const Planner = () => {
  const [daysToShow, setDaysToShow] = useState(1); // Start with mobile default
  const { selectedDate } = useCurrDate();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log("Window width:", width, "Current daysToShow:", daysToShow);

      if (width < 768) {
        // Mobile: show 1 day
        console.log("Setting mobile view: 1 day");
        setDaysToShow(1);
      } else if (width < 1024) {
        // Tablet: show 3 days
        console.log("Setting tablet view: 3 days");
        setDaysToShow(3);
      } else {
        // Desktop: show 7 days
        console.log("Setting desktop view: 7 days");
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

    console.log("generateDates called with daysToShow:", daysToShow);

    if (daysToShow === 1) {
      // For mobile, just show the selected date
      console.log("Mobile: Adding single date");
      dates.push(new Date(currDate));
    } else {
      // For multiple days, center around the selected date
      console.log("Multi-day view: Adding", daysToShow, "days");
      const halfDays = Math.floor(daysToShow / 2);
      for (let i = -halfDays; i < daysToShow - halfDays; i++) {
        const date = new Date(currDate);
        date.setDate(currDate.getDate() + i);
        dates.push(date);
      }
    }

    console.log("Generated dates count:", dates.length);
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
