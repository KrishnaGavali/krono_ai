import React from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const PlanCard = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Card className="w-[95%] h-9  mr-1 rounded-sm p-0.5 pl-2 relative z-10 flex flex-wrap gap-1 text-sm border-primary">
          <p className=" text-primary text-sm truncate">Meeting with Team</p>
        </Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-4 bg-background border border-border rounded-md shadow-md">
        <p className="text-sm font-medium mb-2">Meeting with Team</p>
        <p className="text-xs text-muted-foreground mb-2">
          Discuss project updates and next steps.
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Time:</span> 3:00 PM - 4:00 PM
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlanCard;
