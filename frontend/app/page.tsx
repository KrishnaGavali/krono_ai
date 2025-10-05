import { Feature } from "@/components/Home/Features";
import { Footer } from "@/components/Home/Footer";
import { Hero } from "@/components/Home/Hero";
import React from "react";

const HomePage = () => {
  return (
    <main className=" bg-background">
      <Hero />
      <Feature />
      <Footer />
    </main>
  );
};

export default HomePage;
