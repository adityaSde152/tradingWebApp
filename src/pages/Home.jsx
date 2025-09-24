import React, { Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import HeroSection from "../components/Home/HeroSection";
import FeaturesSection from "../components/Home/FeaturesSection";
import TrustedSection from "../components/Home/TrustedSection";
import FaqSection from "../components/Home/FaqSection";
import LazyComponent from "../components/LazyComponent";
import ChatBot from "../components/ChatBot";

// Lazy load heavy components
const ScrollSnapSection = lazy(() =>
  import("../components/Home/ScrollSnapSection")
);
const MetallicCard = lazy(() => import("../components/Home/MetallicCard"));
const DayNight = lazy(() => import("../components/Home/DayNight"));

const Home = () => {
  return (
    <div>
      <ChatBot />
      {/* <HeroSection /> */}
      <FeaturesSection />

      {/* Lazy load heavy sections */}
      <LazyComponent Component={ScrollSnapSection} />
      <TrustedSection />
      {/* <LazyComponent Component={DayNight} /> */}
      <DayNight />
      <FaqSection />
      <LazyComponent Component={MetallicCard} />
    </div>
  );
};

export default Home;
