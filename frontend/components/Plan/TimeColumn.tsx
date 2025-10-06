import React from "react";

const TimeColumn = () => {
  // Generate hours from 1 AM to 11 PM (excluding starting 12 AM and ending 12 AM)
  const generateTimeSlots = () => {
    const timeSlots = [];

    // Start from 1 AM to 11 AM
    for (let hour = 0; hour < 12; hour++) {
      if (hour === 0) {
        timeSlots.push({
          hour: 12,
          period: "AM",
          display: "",
        });
      } else {
        timeSlots.push({
          hour: hour,
          period: "AM",
          display: `${hour}:00 AM`,
        });
      }
    }

    // Add 12 PM
    timeSlots.push({
      hour: 12,
      period: "PM",
      display: "12:00 PM",
    });

    // Add 1 PM to 11 PM
    for (let hour = 1; hour < 12; hour++) {
      timeSlots.push({
        hour: hour + 12,
        period: "PM",
        display: `${hour}:00 PM`,
      });
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="w-22 flex-shrink-0">
      <div className="flex flex-col border-r border-border">
        <div className=" h-10 bg-primary w-full sticky top-30 z-10" />
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="h-10 w-full border-b border-border text-xs flex items-start justify-start pr-2 text-muted-foreground relative "
          >
            <span className="mt-1 font-medium bg-background relative -top-3 w-3/4 px-1 text-right">
              {slot.display}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeColumn;
