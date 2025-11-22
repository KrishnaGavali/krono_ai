import React from "react";
import { Copy, Check, MessageCircle, Zap, ArrowRight } from "lucide-react";

interface NotConnectedCardProps {
  authCode: string;
  onCopy: () => void;
  copied: boolean;
}

export const NotConnectedCard: React.FC<NotConnectedCardProps> = ({
  authCode,
  onCopy,
  copied,
}) => {
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
