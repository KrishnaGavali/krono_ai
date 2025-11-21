"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Copy,
  Check,
  MessageCircle,
  CheckCircle2,
  Zap,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";

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

// Component for NOT_CONNECTED state
const NotConnectedCard: React.FC<{
  authCode: string;
  onCopy: () => void;
  copied: boolean;
}> = ({ authCode, onCopy, copied }) => {
  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/15551956479?text=Hi", "_blank");
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-card/80 shadow-lg p-8 sm:p-12 max-w-3xl">
        {/* Decorative gradient background */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl -z-10"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">
                Quick Setup
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Connect WhatsApp
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              Link your WhatsApp to unlock intelligent scheduling. It takes just
              a few seconds.
            </p>

            {/* Steps Section */}
            <div className="space-y-3 p-4 sm:p-6 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">
                    Copy your code
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Your unique auth code
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">
                    Open WhatsApp
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Chat with TimelyAI
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">
                    Paste & confirm
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Instant verification
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-4">
            {/* Auth Code Display */}
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
              Your Authentication Code
            </label>
            <div className="group relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 p-1 mb-4">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card rounded-[10px]">
                <div className="flex-1 min-w-0">
                  <code className="font-mono text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent break-words">
                    {authCode}
                  </code>
                </div>
                <button
                  onClick={onCopy}
                  className="p-2 sm:p-3 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
                  title="Copy code"
                >
                  {copied ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy
                      size={18}
                      className="text-muted-foreground group-hover:text-foreground"
                    />
                  )}
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              {copied ? "✓ Copied to clipboard" : "Click to copy"}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
              <button
                onClick={onCopy}
                className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                  copied
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Code
                  </>
                )}
              </button>
              <button
                onClick={handleOpenWhatsApp}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <MessageCircle size={16} />
                Open WhatsApp
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform hidden sm:inline"
                />
              </button>
            </div>

            {/* Info Box */}
            <div className="p-3 sm:p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-xs sm:text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Pro Tip:</span>{" "}
                Keep this code safe. You&apos;ll use it once to verify.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for CONNECTED state
const ConnectedCard: React.FC<{
  connection: WhatsAppConnection;
  userName: string;
}> = ({ connection }) => {
  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/15551956479?text=Connect", "_blank");
  };

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 overflow-y-auto max-h-screen">
      {/* Success Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-50/50 to-emerald-50/30 shadow-lg p-6 sm:p-8 mb-6 flex-shrink-0">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-400/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex items-start gap-4">
          <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            <CheckCircle2 size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              WhatsApp Connected! 🎉
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg">
              Your WhatsApp is linked. Start scheduling events from chat.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-1 overflow-hidden">
        {/* Connection Status Card */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 shadow-lg p-6 sm:p-8 overflow-y-auto">
          <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 sm:mb-6 flex-shrink-0">
            Connection Details
          </h3>

          <div className="space-y-4 sm:space-y-6">
            {/* Phone Number */}
            <div className="pb-4 sm:pb-6 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Connected Phone
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                {connection.phoneNumber}
              </p>
            </div>

            {/* Connection Info */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-primary flex-shrink-0" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate">
                    Connected
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-foreground font-medium">
                  {connection.connectedAt}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-primary flex-shrink-0" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate">
                    Active
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-foreground font-medium">
                  {connection.lastActive}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleOpenWhatsApp}
            className="w-full mt-6 sm:mt-8 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group text-sm sm:text-base flex-shrink-0"
          >
            <MessageCircle size={16} className="sm:w-5 sm:h-5" />
            Open WhatsApp
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform hidden sm:inline"
            />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3 sm:space-y-4 flex-shrink-0">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Status
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-base sm:text-lg font-bold text-foreground">
                Active
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-4 sm:p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Upcoming
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">
              {DUMMY_EVENTS.length}
            </p>
            <p className="text-xs text-muted-foreground">events</p>
          </div>
        </div>
      </div>

      {/* Scheduled Events */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 shadow-lg p-4 sm:p-8 mt-6 overflow-y-auto flex-1">
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
          <h3 className="text-lg sm:text-2xl font-bold text-foreground">
            Events
          </h3>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold">
            {DUMMY_EVENTS.length}
          </span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {DUMMY_EVENTS.map((event, index) => (
            <div
              key={event.id}
              className="group flex items-center justify-between p-3 sm:p-4 border border-border rounded-xl bg-muted/20 hover:bg-accent/10 hover:border-accent/30 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors flex-shrink-0">
                  <span className="font-semibold text-primary text-xs sm:text-sm">
                    {index + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock
                      size={12}
                      className="text-muted-foreground flex-shrink-0"
                    />
                    <p className="text-xs text-muted-foreground">
                      {event.time}
                    </p>
                  </div>
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 hidden sm:block"
              />
            </div>
          ))}
        </div>

        <button className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted/50 transition-colors text-sm sm:text-base flex-shrink-0">
          View All
        </button>
      </div>
    </div>
  );
};

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
      const isConnected = false; // Set to true to test CONNECTED state
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className=" bg-background flex flex-col overflow-hidden mt-20">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-border flex-shrink-0 bg-gradient-to-b from-background to-background/80">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
          Welcome, {user?.name || "User"}! 👋
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {connectionState === "connected"
            ? "WhatsApp connected. Schedule events from chat."
            : "Connect WhatsApp to get started."}
        </p>
      </div>

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
            userName={user?.name || "User"}
          />
        )}
      </div>
    </main>
  );
}
