import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PlanetSection from "./Planet";

const HeroSection = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const chars = headingRef.current.querySelectorAll("span");

    gsap.fromTo(
      chars,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power3.out",
        duration: 0.5,
      }
    );
  }, []);

  const headingText = "Trade\nSmarter,\nProfit Faster";

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row justify-center h-screen  pt-12 bg-dark">
      <div className="w-full lg:w-1/2 py-6 mb-10  flex flex-col gap-2 md:gap-5 justify-center px-6 sm:px-10 md:px-12 lg:px-20 xl:px-25 bg-dark">
        <h1
          ref={headingRef}
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-gideon-roman"
        >
          {headingText.split("").map((char, i) =>
            char === "\n" ? (
              <br key={i} />
            ) : (
              <span key={i} className="lg:inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            )
          )}
        </h1>
        <p className="text-[#B8BCC2] text-sm lg:text-xl w-full">
          Step into the world of binary options with real-time data, powerful
          tools, and lighting-fast execution. Your future, one decision away.
        </p>

        <button className="bg-green rounded text-lg text-white  w-44 h-12 lg:h-14 lg:w-66 font-semibold cursor-pointer hover:bg-green/90">
          Get Started Free
        </button>
      </div>

      <PlanetSection />
    </div>
  );
};

export default HeroSection;
