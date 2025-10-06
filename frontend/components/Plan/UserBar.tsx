import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React from "react";

export const UserBar = () => {
  return (
    <div className=" sticky z-10 top-20 w-full h-10 border-b border-border flex items-center py-2 px-4 justify-between bg-muted">
      <div className=" flex items-center gap-4">
        <div className="  flex items-center ">
          <span>29, Sep</span>
          <span>-</span>
          <span>5, Oct</span>
        </div>
        <span className="">
          <ArrowLeftCircle />
        </span>
        <span className="">
          <ArrowRightCircle />
        </span>
      </div>
      <button className=" bg-primary text-primary-foreground px-4 py-1 rounded-md hover:opacity-80 transition-opacity">
        Today
      </button>
    </div>
  );
};
