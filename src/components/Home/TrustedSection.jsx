import React from "react";
import assets from "../../assets/assets";

const TrustedSection = () => {
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
          <video autoPlay loop muted className="rounded-xl shadow-lg w-full h-[350px]  lg:max-w-[90%] object-cover">
            <source src={assets.trading_vedio} type="video/mp4" />
          </video>
        </div>

        {/* Right Side Card */}
        <div className="bg-white text-dark h-full py-4 md:py-20 px-2 rounded-xl shadow-lg  flex flex-col justify-center items-center w-full lg:w-[32%]">
          <h3 className="text-2xl font-bold mb-2">Streamlined Trading</h3>
          <p className="text-gray-500 text-sm mb-4">Instant Payouts</p>
          <p className="text-gray-700 text-sm text-center mb-6">
            Simplify Your Path to Financial Success with Our Intuitive Binary
            Trading Platform
          </p>
          <button className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-full font-semibold transition cursor-pointer">
            Explore Now
          </button>
        </div>
      </div>

      {/* Bottom Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Partner Card */}
        <div className="bg-white text-dark/90 w-full h-[300px] p-6 rounded-xl shadow-lg flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center" >
            <div className="flex flex-col justify-center items-center gap-2 mb-2">
                <img src={assets.partner} className="w-10" alt="" />
                 <h4 className="text-xl font-bold mb-1">Partner</h4>
            </div>
           
            <p className="text-gray-500 text-sm mb-3">
              Trusted by Industry Leaders
            </p>
            <p className="text-gray-700 text-sm mb-4 text-center font-albert">
              Join Forces with Our Renowned Partners and Leverage Their Expertise
              for Unparalleled Trading Success
            </p>
          </div>
          <button className="bg-green hover:bg-green/90 text-white px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer">
            Become a Partner
          </button>
        </div>

        {/* Testimonials Card */}
        <div className="bg-white text-dark/90 w-full p-6 rounded-xl shadow-lg flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center" >
            <div className="flex flex-col justify-center items-center gap-2 mb-2">
                <img src={assets.neon_glow} className="w-10 h-10 mb-2" alt="" />
                 <h4 className="text-xl font-bold mb-1">Testimonials</h4>
            </div>
           
            <p className="text-gray-500 text-sm mb-3">
              Hear from Our Satisfied Clients
            </p>
            <p className="text-gray-700 text-sm mb-4 text-center ">
              I've been using this platform for months and it's been a
              game-changer for my trading"
            </p>
          </div>
          <button className="bg-green hover:bg-green/90 text-white px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer">
            Read More
          </button>
        </div>

        {/* Resources Card */}
        <div className="bg-white sm:col-span-2 lg:col-span-1 text-dark/90 w-full p-6 rounded-xl shadow-lg flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2 mb-2">
              <img src={assets.resources} className="w-10  mb-2" alt="" />
              <h4 className="text-xl font-bold mb-1">Resources</h4>
            </div>
            
            <p className="text-gray-500 text-sm mb-3">
              Explore Our Resources
            </p>
            <p className="text-gray-700 text-sm mb-4 text-center ">
              Access Insightful Market Analysis, Educational Materials, and Expert
              Guidance to Elevate Your Trading
            </p>
          </div>
          <button className="bg-green hover:bg-green/90 text-white px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
