"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { login } = useAuth();

  useEffect(() => {
    const fetchUserDataAndLogin = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken_timely");
        const userId = localStorage.getItem("userId_timely");

        if (!jwtToken || !userId) {
          window.location.href = "/";
          return;
        }

        // Simulated user data fetch
        const userDataRes = await fetch(
          `https://69196730003ac7b39c9f.fra.appwrite.run/auth/get_user_details?userId=${userId}&jwtToken=${jwtToken}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (userDataRes.ok) {
          const userData = await userDataRes.json();
          console.log("Fetched User Data:", userData);

          const userDataObj = {
            id: userData.user.$id,
            name: userData.user.name,
            email: userData.user.email,
            profilePic: userData.user.profile_url,
            phone: userData.user.phone,
            isPhoneConnected: userData.user.is_phone_connected,
          };

          login(userDataObj);
        }
      } catch (error) {
        console.error("Error during user login:", error);
      }
    };

    fetchUserDataAndLogin();
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
