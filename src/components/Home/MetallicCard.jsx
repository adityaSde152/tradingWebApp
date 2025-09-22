import React from "react";
import PlanetCardModel from "../PlanetCardModel";

const MetallicCard = () => {
  return (
    <div className="flex justify-center items-center mb-4">
      <div
        className="absolute z-20 flex flex-col justify-between h-80 lg:h-90 px-4 sm:px-6 md:px-8 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[650px]
      aspect-[1.586] 
        rounded-2xl border border-neutral-800 
        bg-gradient-to-br from-black via-neutral-950 to-black 
        shadow-2xl overflow-hidden"
      >
        {/* Shiny reflection */}
        <div
          className="absolute top-[-63%] left-[-63%] w-[225%] h-[225%] rotate-12 
          bg-gradient-to-r from-transparent via-white/20 to-transparent 
          animate-spin pointer-events-none"
          style={{ animationDuration: "6s" }}
        />

        {/* Card Content */}
        <div className="relative w-full p-4 h-full z-10 flex justify-center items-center">
          {/* Left text */}
          {/* Left text */}
          <div className="space-y-4">
            <h2 className="text-white font-bold text-xs md:text-base tracking-widest">
              PREMIUM ACCESS
            </h2>
            <p className="text-white/90 text-xs sm:text-sm  tracking-widest">
              EXCLUSIVE TRADING SUITE
            </p>
            <p className="text-gray-300 text-xs sm:text-sm">
              • Secure <br />• 24/7 Markets
            </p>
          </div>

          {/* 3D Planet / Logo */}
          <div className="ml-4 h-full w-full">
            <PlanetCardModel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetallicCard;
