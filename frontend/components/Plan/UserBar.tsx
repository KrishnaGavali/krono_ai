"use client";
import { useCurrDate } from "@/context/CurrDateContext";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { addDays, set, subDays } from "date-fns";

export const UserBar = () => {
  const { selectedDate, prevDate, nextDate, goToToday } = useCurrDate();
  const [stepValue, setStepValue] = useState(1);

  // Hook to detect screen size and set step value
  useEffect(() => {
    const updateStepValue = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile
        setStepValue(1);
      } else if (width >= 768 && width < 1024) {
        // Tablet
        setStepValue(3);
      } else {
        // Desktop
        setStepValue(7);
      }
    };

    updateStepValue();
    window.addEventListener("resize", updateStepValue);

    return () => window.removeEventListener("resize", updateStepValue);
  }, []);

  // Format the selected date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const handlePrevDate = () => {
    prevDate(stepValue);
  };

  const handleNextDate = () => {
    nextDate(stepValue);
  };

  return (
    <div className=" sticky z-10 top-20 w-full h-10 border-b border-border flex items-center py-2 px-4 justify-between bg-muted">
      <div className=" flex items-center gap-3">
        <div className="  flex items-center w-36 md:w-52">
          {stepValue === 1 ? (
            <span className="font-medium text-sm">
              {formatDate(selectedDate)}
            </span>
          ) : (
            <>
              <span>
                {formatDate(subDays(selectedDate, stepValue / 2 - 1))}
              </span>
              <span> - </span>
              <span>{formatDate(addDays(selectedDate, stepValue / 2))}</span>
            </>
          )}
          <span className="text-xs text-muted-foreground ml-2">
            (±{stepValue} days)
          </span>
        </div>
        <span
          className="cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handlePrevDate}
        >
          <ArrowLeftCircle />
        </span>
        <span
          className="cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handleNextDate}
        >
          <ArrowRightCircle />
        </span>
      </div>
      <button
        className=" bg-primary text-primary-foreground px-4 py-1 rounded-md hover:opacity-80 transition-opacity"
        onClick={goToToday}
      >
        Today
      </button>
    </div>
  );
};
