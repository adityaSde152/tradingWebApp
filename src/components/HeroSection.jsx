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
    <div className="flex justify-center h-[110vh] bg-[rgb(0,11,18)]">
    <div className="flex justify-center h-[140vh] bg-dark">
      <div className="basis-1/2 flex flex-col gap-5 justify-center pl-30 h-[90vh]">
        <h1
          ref={headingRef}
          className="text-white md:text-7xl text-8xl font-gideon-roman "
        >
          {headingText.split("").map((char, i) =>
            char === "\n" ? (
              <br key={i} />
            ) : (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            )
          )}
        </h1>
        <p className="text-[#B8BCC2] w-[30vw]">
          Step into the world of binary options with real-time data, powerful
          tools, and lighting-fast execution. Your future, one decision away.
        </p>

        <button className="bg-green rounded text-lg text-white w-[200px] h-[50px]">
          Get Started Free
        </button>
      </div>

      <div className=" bg-[rgb(0,11,18)] basis-1/2 pt-2">
          <PlanetSection />
      </div>
    </div>
  );
};

export default HeroSection;
