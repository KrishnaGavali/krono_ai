import {
  MessageCircle,
  Calendar,
  Brain,
  Database,
  Mic,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureProps {
  heading?: string;
  subheading?: string;
  features?: Feature[];
}

const Feature = ({
  heading = "Everything you need to stay organized",
  subheading = "Features",
  features = [
    {
      title: "WhatsApp Voice Integration",
      description:
        "Send voice notes or text messages directly to our intelligent bot. Capture thoughts instantly without interrupting your workflow.",
      icon: <MessageCircle className="size-6 text-blue-500" />,
    },
    {
      title: "AI-Powered Smart Triage",
      description:
        "Advanced Gemma 3 AI automatically categorizes your messages as events or tasks, understanding context and urgency.",
      icon: <Brain className="size-6 text-purple-500" />,
    },
    {
      title: "Seamless Calendar Sync",
      description:
        "Auto-creates time-blocked events in Google Calendar with perfect scheduling, dates, and notifications.",
      icon: <Calendar className="size-6 text-green-500" />,
    },
    {
      title: "Voice-First Experience",
      description:
        "Designed for busy professionals who think faster than they type. Capture ideas at the speed of thought.",
      icon: <Mic className="size-6 text-orange-500" />,
    },
    {
      title: "Intelligent Dashboard",
      description:
        "Beautiful web interface to review, prioritize, and manage all your captured tasks and upcoming events.",
      icon: <Clock className="size-6 text-cyan-500" />,
    },
    {
      title: "Enterprise-Grade Security",
      description:
        "Your data is encrypted and securely stored with Appwrite. Always accessible, always protected.",
      icon: <Database className="size-6 text-red-500" />,
    },
  ],
}: FeatureProps) => {
  return (
    <section className="py-24 bg-gradient-to-r from-background via-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-primary" />
            {subheading}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Powerful features designed to transform how you capture and organize
            your thoughts
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div key={idx} className="group relative">
              <div className="relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Ready to transform your productivity workflow?
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
            Get started for free
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export { Feature };
