import React from "react";
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
    description: "Intuitive Interface Designed for Novice and Experienced Users",
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



// Card animation (fade only, no movement)
// const cardVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

const FeaturesSection = () => {
  return (
    <motion.section
      className="w-full mx-auto absolute top-[100vh] flex items-center justify-evenly gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.08, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative z-50 w-[25vw] h-[30vh] bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#38D300] group-hover:shadow-[0_0_30px_#38D300] transition-all duration-500"></div>
            <div
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat bg-[#ffffff] opacity-90"
            ></div>
            {/* Floating circles for decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#38D300]/20 rounded-full blur-3xl group-hover:animate-ping"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#38D300]/20 rounded-full blur-2xl group-hover:animate-ping"></div>

            <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-[#38D300] group-hover:shadow-[0_0_30px_#38D300] transition-all duration-500"></div>


            <div className="relative flex flex-col justify-center items-center h-full text-center px-6 hover:text-[#38D300]">
            <h2 className="text-xl font-bold text-black mb-3">{feature.title}</h2>
            <p className="text-gray-700">{feature.description}</p>
            </div>
            </motion.div>
      ))}
    </motion.section>
  );
};

export default FeaturesSection;