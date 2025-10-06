import Planner from "@/components/Plan/Planner";
import TimeColumn from "@/components/Plan/Planner";
import SideBar from "@/components/Plan/SideBar";
import { UserBar } from "@/components/Plan/UserBar";
import React from "react";

const PlanPage = () => {
  return (
    <div className=" flex w-full">
      <div className=" mt-20 text-primary h-screen flex flex-col w-full lg:w-[80%]">
        <UserBar />
        <Planner />
      </div>
      <SideBar />
    </div>
  );
};

export default PlanPage;
