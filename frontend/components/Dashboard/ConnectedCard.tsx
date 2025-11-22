import React from "react";
import {
  MessageCircle,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";

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

interface ConnectedCardProps {
  connection: WhatsAppConnection;
  events: ScheduledEvent[];
}

export const ConnectedCard: React.FC<ConnectedCardProps> = ({
  connection,
  events,
}) => {
  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/15551956479?text=Connect", "_blank");
  };

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 overflow-y-auto max-h-screen">
      {/* Success Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5 shadow-lg p-6 sm:p-8 mb-6 flex-shrink-0">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex items-start gap-4">
          <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
            <CheckCircle2 size={24} className="text-accent-foreground" />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-1 h-fit">
        {/* Connection Status Card */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 shadow-lg p-6 sm:p-8 overflow-y-auto h-fit">
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
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6 h-1/2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Status
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent animate-pulse"></div>
              <p className="text-base sm:text-lg font-bold text-foreground">
                Active
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 p-4 sm:p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 h-1/2">
              Upcoming
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">
              {events.length}
            </p>
            <p className="text-xs text-muted-foreground">events</p>
          </div>
        </div>
      </div>

      {/* Scheduled Events */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/80 shadow-lg p-4 sm:p-8 mt-6 h-fit">
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
          <h3 className="text-lg sm:text-2xl font-bold text-foreground">
            Todays Events
          </h3>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold">
            {events.length}
          </span>
        </div>

        {/* Mobile: List View, Desktop: Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 h-fit overflow-auto">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card to-card/80 p-4 sm:p-5 hover:border-accent/50 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              {/* Decorative corner accent */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-all"></div>

              <div className="relative z-10">
                {/* Event Number Badge */}
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors mb-3">
                  <span className="font-semibold text-primary text-xs">
                    {index + 1}
                  </span>
                </div>

                {/* Event Title */}
                <p className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {event.title}
                </p>

                {/* Event Time */}
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-accent flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {event.time}
                  </p>
                </div>

                {/* Hover Arrow Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight
                    size={16}
                    className="text-accent group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
