import React from "react";
import appStoreBadge from "../assets/appstore.png";
import playStoreBadge from "../assets/playstore.png";
import phoneMockup from "../assets/phone-mockup.png";
import { ArrowDown } from "lucide-react";

const DownloadApp = () => {
  return (
    <section className="w-full h-full bg-dark flex flex-col lg:flex-row items-center lg:items-start justify-center px-4  py-20 xl:py-26 text-white">
      {/* Left Content */}
      <div className="lg:w-2/3 ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-300 font-bold mb-6 leading-tight">
          Download Our <span className="text-green">Trading App</span>
        </h1>

        <p className="text-sm md:text-md lg:text-xl mb-8 text-gray-300">
          Trade smarter with real-time market updates, advanced charting tools,
          and instant trade execution. Our app is built to give you
          <span className="text-green font-semibold">
            {" "}
            speed, security, and control
          </span>{" "}
          — right from your pocket.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-green transition hover:-translate-y-2 duration-300">
            <h3 className="text-lg font-semibold text-green">
              📊 Live Market Data
            </h3>
            <p className="text-gray-400 text-sm">
              Stay ahead with real-time prices and insights.
            </p>
          </div>
          <div className="p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-green transition hover:-translate-y-2 duration-300">
            <h3 className="text-lg font-semibold text-green">
              ⚡ Fast Execution
            </h3>
            <p className="text-gray-400 text-sm">
              Execute trades instantly with zero delays.
            </p>
          </div>
          <div className="p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-green transition hover:-translate-y-2 duration-300">
            <h3 className="text-lg font-semibold text-green">🔒 Secure</h3>
            <p className="text-gray-400 text-sm">
              Bank-grade encryption for safety.
            </p>
          </div>
          <div className="p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-green transition hover:-translate-y-2 duration-300">
            <h3 className="text-lg font-semibold text-green">
              🌍 Trade Anywhere
            </h3>
            <p className="text-gray-400 text-sm">
              Stay connected across all devices.
            </p>
          </div>
        </div>

        {/* Download Buttons in left content */}
        <div className="hidden lg:flex flex-col items-center sm:flex-row gap-4">
          <a
            href="https://apps.apple.com/us/app/example-app/id123456789"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download from App Store"
            className="transition transform hover:scale-105"
          >
            <img src={appStoreBadge} alt="App Store" className="h-14 md:h-14" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.example.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download from Google Play"
            className="transition transform hover:scale-105"
          >
            <img
              src={playStoreBadge}
              alt="Google Play"
              className="h-25 md:h-30"
            />
          </a>
        </div>
      </div>

      {/* Right Phone Mockup (completely untouched) */}
      <div className="flex justify-center items-center relative mt-2 w-100">
        <img
          src={phoneMockup}
          alt="App Preview"
          className="w-full animate-bounce-slow drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]"
        />

        {/* Buttons inside phone center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <p className="flex items-center gap-2 text-sm mb-2 text-gray-200">
            Get it Now <ArrowDown className="w-5 h-5 text-green-400" />
          </p>
          <a
            href="https://apps.apple.com/us/app/example-app/id123456789"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download from App Store"
            className="transition transform hover:scale-105"
          >
            <img src={appStoreBadge} alt="App Store" className="h-12 md:h-12" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.example.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download from Google Play"
            className="transition transform hover:scale-105"
          >
            <img
              src={playStoreBadge}
              alt="Google Play"
              className="h-26 md:h-28"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
