"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface AuthCallbackData {
  authStatus: "login_success" | "signup_success" | null;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
}

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [authData, setAuthData] = useState<AuthCallbackData>({
    authStatus: null,
    userId: null,
    userName: null,
    userEmail: null,
  });
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");

  // Map backend error codes to user-friendly messages
  const getErrorMessage = (errorCode: string | null): string => {
    const errorMessages: Record<string, string> = {
      access_denied:
        "You denied access to your Google account. Please try again and grant the necessary permissions.",
      forbidden:
        "This endpoint is not allowed. Please contact support if the issue persists.",
      auth_init_failed:
        "Failed to initialize Google authentication. Please try again.",
      missing_code:
        "Authorization code is missing. Please try the authentication process again.",
      internal_server_error:
        "An unexpected error occurred on our servers. Please try again later.",
      invalid_code:
        "The authorization code is invalid or has expired. Please try again.",
      token_exchange_failed:
        "Failed to exchange the authorization code for tokens. Please try again.",
      invalid_user_info:
        "Could not retrieve valid user information from Google. Please try again.",
      invalid_authorization_code:
        "The authorization code is invalid or has expired.",
      duplicate_user: "User already exists in our system.",
      authentication_failed:
        "An error occurred during authentication. Please try again.",
      user_creation_failed: "Failed to create your account. Please try again.",
      database_error: "A database error occurred. Please try again.",
      server_error: "Server configuration error. Please try again later.",
    };

    return (
      errorMessages[errorCode || ""] ||
      "An authentication error occurred. Please try again."
    );
  };

  useEffect(() => {
    const authStatus = searchParams.get("authStatus") as
      | "login_success"
      | "signup_success"
      | null;
    const error = searchParams.get("error");
    const jwtToken = searchParams.get("jwtToken");
    const userId = searchParams.get("userId");
    const userName = searchParams.get("userName");
    const userEmail = searchParams.get("userEmail");

    if (
      (authStatus === "login_success" || authStatus === "signup_success") &&
      jwtToken
    ) {
      // Store auth data
      setAuthData({
        authStatus,
        userId,
        userName,
        userEmail,
      });

      // Store JWT token in localStorage or context
      if (typeof window !== "undefined") {
        localStorage.setItem("jwtToken", jwtToken);
        if (userId) localStorage.setItem("userId", userId);
      }

      // Simulate authentication processing
      setTimeout(() => {
        setStatus("success");
      }, 1500);
    } else if (error) {
      setStatus("error");
      setErrorMessage(getErrorMessage(error));
    } else {
      setStatus("error");
      setErrorMessage("Invalid authentication request.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status]);

  useEffect(() => {
    if (countdown === 0 && status === "success") {
      router.push("/dashboard?userId=" + authData.userId);
    }
  }, [countdown, status, router, authData.userId]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Authentication</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          {/* Loading State */}
          {status === "loading" && (
            <div className="space-y-4 w-full flex flex-col items-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-foreground">
                  Processing your authentication...
                </p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we verify your credentials.
                </p>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg animate-pulse" />
                <CheckCircle2 className="h-16 w-16 text-green-500 relative" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  {authData.authStatus === "signup_success"
                    ? "Welcome! Account Created"
                    : "Welcome Back!"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {authData.authStatus === "signup_success"
                    ? `Your account has been created successfully, ${
                        authData.userName || ""
                      }!`
                    : `You have been successfully logged in, ${
                        authData.userName || ""
                      }!`}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="w-full bg-green-500/10 border border-green-500/30 rounded-lg py-3 text-center">
                <p className="text-sm font-medium text-foreground">
                  Redirecting in{" "}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {countdown}
                  </span>{" "}
                  seconds...
                </p>
              </div>

              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full"
              >
                Go to Dashboard Now
              </Button>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 rounded-full blur-lg animate-pulse" />
                <AlertCircle className="h-16 w-16 text-destructive relative" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  Authentication Failed
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {errorMessage}
                </p>
              </div>

              {/* Error Info Box */}
              <div className="w-full bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-center">
                <p className="text-xs font-medium text-destructive dark:text-destructive/80">
                  Please check your credentials and try again.
                </p>
              </div>

              <div className="flex gap-3 w-full">
                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="flex-1"
                >
                  Back Home
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
