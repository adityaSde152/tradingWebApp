import React, { useState, useEffect, useRef } from "react";
import assets from "../../assets/assets";

const DayNightVertical = () => {
  const containerRef = useRef(null);
  const dayImageRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [ defaultDay, setDefaultDay ] = useState('Night');

  useEffect(() => {
    let frameId;

    const handleScroll = () => {
      if (!containerRef.current) return;

      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        let progress = 0;
        if (rect.top <= 0 && rect.bottom >= windowHeight) {
          const totalScroll = rect.height - windowHeight;
          const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
          progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
        } else if (rect.top > 0) {
          progress = 0;
        } else {
          progress = 1;
        }

        // Bottom → Up sliding effect
        if (dayImageRef.current) {
          dayImageRef.current.style.transform = `translate3d(0, ${100 - progress * 100}%, 0)`;
        }

        // Text color switch
        if (titleRef.current && textRef.current) {
          if (progress > 0.5) {
            titleRef.current.style.color = "black";
            textRef.current.style.color = "rgba(0,0,0,0.7)";
            setDefaultDay('Day');
          } else {
            titleRef.current.style.color = "white";
            textRef.current.style.color = "rgba(255,255,255,0.8)";
            setDefaultDay('Night')
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        {/* Night background (base) */}
        <img
          src={assets.Night}
          alt="Night Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Day background sliding from bottom */}
        <img
          ref={dayImageRef}
          src={assets.Day}
          alt="Day Background"
          className="absolute top-0 left-0 w-full h-full object-cover will-change-transform"
          style={{
            transform: "translate3d(0,100%,0)", // start hidden below
            transition: "transform 0.05s linear", // smooth scrubbing
          }}
        />

        {/* Foreground content */}
        <div className="relative z-10 flex justify-between items-center h-full px-12">
          <div className="max-w-lg">
            <h1
              ref={titleRef}
              className="text-8xl font-bold transition-colors duration-300"
            >
              Trade All {defaultDay}
            </h1>
            <p
              ref={textRef}
              className="mt-4 text-lg transition-colors duration-300"
            >
              Cryptocurrencies and our unique Synthetic Indices are available
              24/7.
            </p>
            <button className="mt-6 px-6 py-3 bg-white border-2 border-[#38D300] cursor-pointer text-[#38D300] font-bold rounded-xl hover:bg-[#38D300] hover:text-white transition-colors duration-300">
              Open account
            </button>
          </div>

          <div className="pt-25">
            <img
              src={assets.day_night}
              alt="Man"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DayNightVertical;
