import TimeColumn from "@/components/Plan/Planner";
import { UserBar } from "@/components/Plan/UserBar";
import React from "react";

const PlanPage = () => {
  return (
    <div className=" pt-20 text-primary h-screen flex flex-col">
      <UserBar />
      <TimeColumn />
    </div>
  );
};

export default PlanPage;
