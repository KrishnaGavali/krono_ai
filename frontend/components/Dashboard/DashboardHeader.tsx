import React from "react";

interface DashboardHeaderProps {
  userName: string;
  isConnected: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  isConnected,
}) => {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-border flex-shrink-0 bg-gradient-to-b from-background to-background/80">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
        Welcome, {userName}! 👋
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground">
        {isConnected
          ? "WhatsApp connected. Schedule events from chat."
          : "Connect WhatsApp to get started."}
      </p>
    </div>
  );
};
