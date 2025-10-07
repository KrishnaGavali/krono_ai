import React from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const PlanCard = () => {
  return (
    <HoverCard openDelay={75} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Card className="w-[95%] h-9 rounded-sm p-0.5 pl-2 relative z-10 flex flex-wrap gap-1 text-sm border-primary">
          <p className=" text-primary text-sm truncate">Meeting with Team</p>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-full mt-2 p-4 bg-background border border-border/10 rounded-md shadow-md">
        <p className="text-sm font-medium mb-2">Meeting with Team</p>
        <p className="text-xs text-muted-foreground mb-2">
          Discuss project updates and next steps.
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Time:</span> 3:00 PM - 4:00 PM
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default PlanCard;
