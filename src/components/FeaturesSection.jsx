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
const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

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
          variants={cardVariants}
          className="bg-white text-[#0C1522] p-8 rounded shadow hover:shadow-lg flex flex-col justify-center items-center transition w-[25vw] h-[25vh]"
        >
          <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
          <p className="text-gray-700 text-center">{feature.description}</p>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default FeaturesSection;
