import React, { Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import NavBar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";
import HeroSection from "../components/Home/HeroSection";
import FeaturesSection from "../components/Home/FeaturesSection";
import TrustedSection from "../components/Home/TrustedSection";
import FaqSection from "../components/Home/FaqSection";

// Lazy load heavy components
const ScrollSnapSection = lazy(() => import("../components/Home/ScrollSnapSection"));
const MetallicCard = lazy(() => import("../components/Home/MetallicCard"));
const DayNight = lazy(() => import("../components/Home/DayNight"));

const LazyComponent = ({ Component }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1,     
  });

  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading...</div>}>
          <Component />
        </Suspense>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <HeroSection />/
      <FeaturesSection />

      {/* Lazy load heavy sections */}
      <LazyComponent Component={ScrollSnapSection} />
      <TrustedSection />
      {/* <LazyComponent Component={DayNight} /> */}
      <DayNight/>
      <FaqSection />
      <LazyComponent Component={MetallicCard} />

      <Footer />
    </div>
  );
};

export default Home;
