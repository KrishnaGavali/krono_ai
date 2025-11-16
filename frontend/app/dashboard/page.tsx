"use client";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const id = localStorage.getItem("userId");

    setJwtToken(token);
    setUserId(id);

    console.log("JWT Token:", token);
    console.log("User ID:", id);

    // if (!token || !id) {
    //   // Redirect to login if not authenticated
    //   window.location.href = "/login";
    // }
  }, []);

  return (
    <div>
      {jwtToken} {userId}
    </div>
  );
};

export default UserDashboard;
