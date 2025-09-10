import React from "react";
import PlanetCardModel from "../PlanetCardModel";

const MetallicCard = () => {
  return (
    <div className="relative">
      <div className="absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 md:-bottom-[45vh] w-[18] sm:w-[25] md:w-[33] h-[24vh] sm:h-[33vh] md:h-[40vh] aspect-[1.586] rounded-2xl border border-black bg-gradient-to-br from-black via-neutral-950 to-black shadow-2xl overflow-hidden p-6 flex flex-col justify-between">
        
        {/* Shiny reflection */}
        <div
          className="absolute top-[-60%] left-[-60%] w-[220%] h-[220%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-spin pointer-events-none"
          style={{ animationDuration: "6s" }}
        ></div>

        {/* Card Content */}
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-xs md:text-lg tracking-widest">
              PLATINUM MEMBER
            </h2>
            <p className="text-white/90 text-xs md:text-xl tracking-widest my-6">
              **** **** **** 1234
            </p>
            <p className="text-gray-300 text-xs sm:text-sm">Valid Thru: 09/30</p>
          </div>

          {/* Embedded 3D Earth */}
          <div className="w-[200px] sm:w-[300px] h-[180px] sm:h-[300px]">
            <PlanetCardModel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetallicCard;
