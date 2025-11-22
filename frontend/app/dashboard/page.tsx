"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  DashboardHeader,
  NotConnectedCard,
  ConnectedCard,
  LoadingState,
} from "@/components/Dashboard";

type ConnectionState = "loading" | "not_connected" | "connected";

interface WhatsAppConnection {
  phoneNumber: string;
  connectedAt: string;
  lastActive: string;
}

interface ScheduledEvent {
  id: string;
  title: string;
  time: string;
}

// Dummy data for scheduled events
const DUMMY_EVENTS: ScheduledEvent[] = [
  { id: "1", title: "Team Standup", time: "10:00 AM" },
  { id: "2", title: "Project Review", time: "2:30 PM" },
  { id: "3", title: "Client Call", time: "4:00 PM" },
];

// Main Dashboard Component
export default function Dashboard() {
  const { user } = useAuth();
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("loading");
  const [copied, setCopied] = useState(false);
  const [authCode] = useState(
    "TML-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  // Dummy connection data
  const whatsappConnection: WhatsAppConnection = {
    phoneNumber: "+1 (555) 195-6479",
    connectedAt: "Nov 20, 2025 at 2:45 PM",
    lastActive: "Today at 11:30 AM",
  };

  useEffect(() => {
    // Simulate checking connection state from API
    // For now, toggle between states for testing
    const timer = setTimeout(() => {
      // Change this to determine the state
      const isConnected = true; // Set to true to test CONNECTED state
      setConnectionState(isConnected ? "connected" : "not_connected");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(authCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Loading state
  if (connectionState === "loading") {
    return <LoadingState />;
  }

  const isConnected = connectionState === "connected";

  return (
    <main className=" bg-background flex flex-col overflow-hidden mt-20">
      <DashboardHeader
        userName={user?.name || "User"}
        isConnected={isConnected}
      />

      {/* Main Content - Full Height */}
      <div className="flex-1 overflow-hidden">
        {connectionState === "not_connected" ? (
          <NotConnectedCard
            authCode={authCode}
            onCopy={handleCopyCode}
            copied={copied}
          />
        ) : (
          <ConnectedCard
            connection={whatsappConnection}
            events={DUMMY_EVENTS}
          />
        )}
      </div>
    </main>
  );
}
