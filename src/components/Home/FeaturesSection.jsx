import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Live Data",
    description: "Monitor the Markets in Real-Time for Informed Decisions",
  },
  {
    title: "Instant",
    description: "Get Your Winnings Quickly and Securely, Hassle-Free",
  },
  {
    title: "Easy UI",
    description:
      "Intuitive Interface Designed for Novice and Experienced Users",
  },
];

// Container animation (stagger effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="w-full mx-auto bg-dark py-2 flex items-center justify-evenly px-4 lg:px-20 lg:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Large screen layout (unchanged) */}
      <div className="hidden md:flex items-center justify-evenly gap-6 w-full">
        {features.map((feature, idx) => (
          // your same motion.div card here
          <motion.div
            key={idx}
            whileHover={{ scale: 1.08, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-full z-50  h-[20vh] lg:h-[30vh] py-6 bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#38D300] group-hover:shadow-[0_0_30px_#38D300] transition-all duration-500"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat bg-[#ffffff] opacity-90"></div>
            {/* Floating circles for decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#38D300]/20 rounded-full blur-3xl group-hover:animate-ping"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#38D300]/20 rounded-full blur-2xl group-hover:animate-ping"></div>

            <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-[#38D300] group-hover:shadow-[0_0_30px_#38D300] transition-all duration-500"></div>

            <div className="relative flex flex-col justify-center items-center h-full text-center px-6 hover:text-[#38D300]">
              <h2 className="text-xl font-bold text-black mb-3">
                {feature.title}
              </h2>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Small screen sliding animation */}
      <div className="flex md:hidden relative w-full h-[20vh] justify-center items-center overflow-hidden">
        {features.map(
          (feature, idx) =>
            idx === activeIndex && ( // render only the active card
              <motion.div
                key={idx}
                className="absolute w-[80vw] h-[20vh] bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
                initial={{ x: "100%", opacity: 0 }} // start off-screen (right)
                animate={{ x: "0%", opacity: 1 }} // move to center
                exit={{ x: "100%", opacity: 0 }} // slide back right
                transition={{ duration: 1 }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat bg-[#ffffff] opacity-90"></div>

                {/* Floating circles for decoration */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#38D300]/20 rounded-full blur-3xl group-hover:animate-ping"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#38D300]/20 rounded-full blur-2xl group-hover:animate-ping"></div>

                <div className="relative flex flex-col justify-center items-center h-full text-center px-6">
                  <h2 className="text-xl font-bold text-black mb-3">
                    {feature.title}
                  </h2>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </motion.div>
            )
        )}
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
