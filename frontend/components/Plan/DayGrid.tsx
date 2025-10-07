import React from "react";
import PlanCard from "./PlanCard";

const PlanGrid = ({ date }: { date: Date }) => {
  // Format the date to display day name and date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Check if the given date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="w-full flex flex-col border-r border-border/30">
      <div
        className={`h-10 w-full border-b border-border sticky top-30 text-center flex flex-col justify-center z-20 bg-background ${
          isToday(date) ? "bg-primary/30 backdrop-blur-lg" : ""
        }`}
      >
        <span className="font-medium text-sm">{formatDate(date)}</span>
      </div>
      <div className="flex-1">
        {new Array(24).fill(0).map((_, index) => {
          if (index === 5 && date.getDate() % 2 === 0) {
            return (
              <div
                key={index}
                className={`h-10 w-full border-b border-border/30 ${
                  isToday(date) ? "bg-primary/10" : ""
                }`}
              >
                <PlanCard />
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`h-10 w-full border-b border-border/30 ${
                isToday(date) ? "bg-primary/10" : ""
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanGrid;
