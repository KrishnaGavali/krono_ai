"use client";
import { Star, ArrowRight, CheckCircle, Mic } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "../ui/google-icon";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const Hero = ({
  heading = "Chat with your Calendar Plan your Day.",
  description = "Krono AI is the voice-first productivity platform that captures your tasks, and appointments from WhatsApp and automatically organizes them using AI-powered triage.",
  button = {
    text: "Create Account with Google",
    url: "#get-started",
  },
  reviews = {
    count: 150,
    rating: 4.8,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Productive User 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Productive User 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Productive User 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Productive User 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Productive User 5",
      },
    ],
  },
}: Hero7Props) => {
  const googleLogin = async () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <section className="relative min-h-screen pt-26 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Now powered by Gemma 3 AI
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight md:w-[680px] lg:w-[1000px] mx-auto">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
                {heading}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a onClick={googleLogin} className="flex items-center gap-2">
                <GoogleIcon className="w-5 h-5" />
                {button.text}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg hover:text-white dark:hover:bg-accent dark:hover:text-background"
            >
              <Mic className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            {[
              "WhatsApp Integration",
              "AI-Powered Triage",
              "Google Calendar Sync",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
                {benefit}
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="pt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {reviews.avatars.slice(0, 4).map((avatar, index) => (
                    <Avatar
                      key={index}
                      className="size-10 border-2 border-background"
                    >
                      <AvatarImage src={avatar.src} alt={avatar.alt} />
                    </Avatar>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="size-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-1 text-sm font-semibold">
                      {reviews.rating?.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reviews.count}+ professionals already saving time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
