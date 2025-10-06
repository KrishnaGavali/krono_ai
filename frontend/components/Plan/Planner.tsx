import React from "react";
import TimeColumn from "./TimeColumn";
import PlanGrid from "./PlanGrid";

const Planner = () => {
  return (
    <div className="flex flex-1">
      <TimeColumn />
      <PlanGrid />
    </div>
  );
};

export default Planner;
