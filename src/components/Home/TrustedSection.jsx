import React from "react";
import assets from "../../assets/assets";
import { FaBitcoin, FaPlus } from "react-icons/fa6";
import { FaEthereum, FaUser } from "react-icons/fa";
import { RiBnbFill } from "react-icons/ri";
import TradingCandleCard from "../TrustedSection/TradingCandleCard";
import { useNavigate } from "react-router-dom";

const TrustedSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-dark text-white w-full px-6 md:px-16 py-12 flex flex-col gap-10">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold  text-center">
        Trusted by
      </h2>

      {/* Main Content: Image + Right Card */}
      <div className="flex flex-col lg:flex-row w-full h-full gap-5 lg:gap-0">
        {/* Left Side Image */}
        <div className="w-full lg:w-[68%] ">
          <video
            autoPlay
            loop
            muted
            className="rounded-xl shadow-lg w-full h-[350px]  lg:max-w-[90%] object-cover"
          >
            <source src={assets.trading_vedio} type="video/mp4" />
          </video>
        </div>

        {/* Right Side Card */}
        <div className="bg-white text-dark h-[350px] py-4 md:py-20 px-2 rounded-xl shadow-lg relative  flex flex-col justify-center items-center w-full lg:w-[32%]">
          <div className="">
            {/* GBP */}
            <div className="z-30 absolute top-10 left-2 w-[95%] flex justify-between items-center bg-white rounded-xl shadow-2xl hover:scale-103 duration-300 p-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl text-yellow-500">
                  <FaBitcoin />
                </span>
                <div>
                  <p className="font-semibold">BTC</p>
                  <p className="text-sm text-gray-500">Bitcoin</p>
                </div>
              </div>
              <p className="font-bold text-lg">$1,17,168</p>
            </div>

            {/* USD */}
            <div className="z-20 absolute top-25 left-6 w-[85%] flex justify-between items-center bg-white rounded-xl shadow-2xl hover:scale-103 duration-300 p-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl text-blue-500">
                  <FaEthereum />
                </span>
                <div>
                  <p className="font-semibold">ETH</p>
                  <p className="text-sm text-gray-500">Etherium</p>
                </div>
              </div>
              <p className="font-bold text-lg">$4,578</p>
            </div>

            {/* EUR */}
            <div className="z-10 absolute top-40 left-12 w-[75%] flex justify-between items-center bg-white rounded-xl shadow-2xl hover:scale-103 duration-300 p-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl text-yellow-400">
                  <RiBnbFill />
                </span>
                <div>
                  <p className="font-semibold">BNB</p>
                  <p className="text-sm text-gray-500">Binance coin</p>
                </div>
              </div>
              <p className="font-bold  text-lg">$995</p>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center absolute bottom-6">
            <p className="text-green text-xl font-semibold">Trade Crypto</p>
            <p className="text-dark font-bold">with Zero Limits</p>
          </div>
        </div>
      </div>

      {/* Bottom Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div
          className="relative col-span-1 bg-white h-[350px] lg:h-full text-dark/90 rounded-xl shadow-lg bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${assets.card_2_bg})` }}
        >
          {/* Content */}
          {/* <div className="relative z-10 py-2 px-2 flex flex-col items-center h-[350px] sm:h-full w-full"> */}
          <button
            onClick={() => navigate(`/dashboard/markets`)}
            className="bg-gradient-to-br from-green-600 to-green absolute left-[30%] right-[30%] top-[25%] mt-20 sm:mt-12 hover:scale-105 duration-200  text-white rounded-xl py-2 px-6 md:px-8 font-bold text-base md:text-lg shadow-2xl cursor-pointer"
          >
            Trade
          </button>
          {/* </div> */}
        </div>

        {/* 2nd Card */}
        <div className="relative text-white w-full h-[350px]   p-6 rounded-xl shadow-lg flex flex-col justify-between items-start overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${assets.card_3_bg})` }}
          ></div>

          {/* Opacity overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Content */}
          <div className="relative w-full h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex font-semibold items-center gap-2">
              <FaUser /> <span>Accounts</span>
            </div>

            {/* Cards Row */}
            <div className="flex w-full gap-2">
              {/* Trading */}
              <div className="w-full h-full flex flex-col items-center py-2">
                <img
                  src={assets.hero_img}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h3 className="font-semibold">Trading</h3>
                <p className="text-gray-200 text-xs">6 Members</p>
              </div>

              {/* Demo */}
              <div className="w-full h-full flex flex-col items-center py-2 shadow-2xl rounded-md bg-white/90 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  <img
                    src={assets.hero_img}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <img
                    src={assets.hero_img}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-400 p-1">
                    <div
                      className="w-6 h-6 border-2 border-green border-dotted border-t-transparent rounded-full animate-spin"
                      style={{ animationDuration: "15s" }} // faster spin
                    ></div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mt-2">Demo</h3>
                <p className="text-gray-800">Unlimited</p>
              </div>

              {/* Join */}
              <div className="w-full h-full flex flex-col items-center py-2">
                <FaPlus className="text-green text-5xl w-10 h-10 rounded-full bg-gray-200 p-3 shadow-2xl" />
                <h3 className="font-semibold">Join</h3>
                <p className="text-gray-200 text-xs">6 Members</p>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full h-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  src={assets.hero_img}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <img
                  src={assets.hero_img}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <img
                  src={assets.hero_img}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <p>4M+ trusted users</p>
            </div>
          </div>
        </div>

        {/* Trading Card */}

        {/* Resources Card */}
        <div className="bg-white h-[350px] sm:col-span-2 lg:col-span-1 text-dark/90 w-full rounded-xl shadow-lg flex flex-col justify-center items-center">
          <TradingCandleCard />
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
