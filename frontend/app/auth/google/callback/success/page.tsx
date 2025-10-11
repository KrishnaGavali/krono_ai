"use client";
import React, { useEffect } from "react";
import { account } from "@/handlers/appwrite";
const GoogleAuthSuccessPage = () => {
  const printgoogleres = async () => {
    const session = await account.getSession({
      sessionId: "current",
    });

    console.log(session.provider);
    console.log(session.providerAccessToken);
  };

  useEffect(() => {
    printgoogleres();
  }, []);

  return <div className=" mt-22 text-green-500">GoogleAuthSuccessPage</div>;
};

export default GoogleAuthSuccessPage;
