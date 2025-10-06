import React from "react";
import { Calendar } from "../ui/calendar";

const SideBar = () => {
  return (
    <div className=" w-[20%] hidden lg:block mt-20 p-2 sticky top-20 h-full">
      <div className=" h-full w-full rounded-2xl p-1">
        <Calendar className=" w-full rounded-2xl border border-border" />
      </div>
    </div>
  );
};

export default SideBar;
