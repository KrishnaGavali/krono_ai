import React from "react";

const PlanGrid = () => {
  const timeSlots = new Array();

  return (
    <div className="w-full flex flex-col">
      <div className=" h-10 w-full border-b border-border sticky top-30 text-center flex flex-col justify-center z-10 bg-background">
        <span className=" font-medium">Monday, 30 Sep</span>
      </div>
      <div className=" flex-1 ">
        {new Array(24).fill(0).map((_, index) => (
          <div
            key={index}
            className=" h-10 w-full border-b border-border "
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PlanGrid;
