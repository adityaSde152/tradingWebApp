import React from "react";
import PlanetCardModel from "../PlanetCardModel";

const MetallicCard = () => {
  return (
    <div className="relative">
      <div className="absolute right-[33%] -bottom-[29vh] w-[35%] h-[40vh] aspect-[1.586] rounded-2xl border border-black bg-gradient-to-br from-black via-neutral-950 to-black shadow-2xl overflow-hidden p-6 flex flex-col justify-between">
        
        {/* Shiny reflection */}
        <div
          className="absolute top-[-60%] left-[-60%] w-[220%] h-[220%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-spin pointer-events-none"
          style={{ animationDuration: "6s" }}
        ></div>

        {/* Card Content */}
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg tracking-widest">
              PLATINUM MEMBER
            </h2>
            <p className="text-white/90 text-xl tracking-widest my-6">
              **** **** **** 1234
            </p>
            <p className="text-gray-300 text-sm">Valid Thru: 09/30</p>
          </div>

          {/* Embedded 3D Earth */}
          <div className="w-[300px] h-[300px]">
            <PlanetCardModel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetallicCard;
