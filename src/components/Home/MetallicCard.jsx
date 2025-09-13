import React from "react";
import PlanetCardModel from "../PlanetCardModel";

const MetallicCard = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div
        className="absolute -bottom-[17vh] sm:-bottom-[26vh] md:-bottom-[34vh] lg:-bottom-[33vh] flex flex-col justify-between px-4 sm:px-6 md:px-8 
        w-[280px] sm:w-[360px] md:w-[420px] lg:w-[33%] aspect-[1.586] 
        rounded-2xl border border-neutral-800 
        bg-gradient-to-br from-black via-neutral-950 to-black 
        shadow-2xl overflow-hidden"
      >
        {/* Shiny reflection */}
        <div
          className="absolute top-[-60%] left-[-60%] w-[220%] h-[220%] rotate-12 
          bg-gradient-to-r from-transparent via-white/20 to-transparent 
          animate-spin pointer-events-none"
          style={{ animationDuration: "6s" }}
        />

        {/* Card Content */}
        <div className="relative w-full h-full z-10 flex justify-center items-center">
          {/* Left text */}
          <div className="space-y-4 pl-4">
            <h2 className="text-white font-bold text-xs sm:text-base md:text-lg tracking-widest">
              PLATINUM MEMBER
            </h2>
            <p className="text-white/90t text-xs sm:text-sm md:text-base tracking-widest">
              **** **** **** 1234
            </p>
            <p className="text-gray-300 text-xs sm:text-sm">
              Valid Thru: 09/30
            </p>
          </div>

          {/* 3D Planet / Logo */}
          <div className="ml-4 w-44 h-50 sm:w-66 sm:h-66 md:w-72 md:h-72 lg:w-82 lg:h-82">
            <PlanetCardModel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetallicCard;
