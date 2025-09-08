import React, { useEffect, useState, useRef } from "react";
import assets from "../../assets/assets";

const DayNight = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate progress when the section is visible
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const totalScroll = rect.height - windowHeight; // total scrollable space in this section
        const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
        const newProgress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
        setProgress(newProgress);
      } else if (rect.top > 0) {
        setProgress(0); // not yet reached
      } else {
        setProgress(1); // already scrolled past
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      {/* Sticky container - pinned during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden ">
        {/* Night background first */}
        <img
          src={assets.Night}
          alt="Night Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Day background fades in */}
        <img
          src={assets.Day}
          alt="Day Background"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: progress }}
        />

        {/* Foreground content */}
        <div className="relative z-10 flex justify-between items-center h-full px-12">
          <div className="max-w-lg">
            <h1
              className="text-8xl font-bold transition-colors duration-300"
              style={{ color: progress > 0.5 ? "black" : "white" }}
            >
              {progress > 0.5 ? "Trade all day" : "Trade all night"}
            </h1>
            <p
              className="mt-4 text-lg transition-colors duration-300"
              style={{ color: progress > 0.5 ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.8)" }}
            >
              Cryptocurrencies and our unique Synthetic Indices are available 24/7.
            </p>
            <button className="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600">
              Open account
            </button>
          </div>

          <div className="flex-shrink-0 pt-10]">
            <img
              src={assets.day_night}
              alt="Man"
              className="max-h-[180vh]  object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default  DayNight;
