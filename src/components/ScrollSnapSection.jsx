import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tradingCards = [
  {
    title: "Live Data",
    description: "Monitor the markets in real-time for smarter decisions.",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f5?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Instant Payouts",
    description: "Withdraw your profits quickly and securely, anytime.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Smart Tools",
    description: "Analyze trends and trade confidently with AI-powered tools.",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=60",
  },
];

export default function ScrollSnapFeature() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[#0B0F1A] text-white flex">
      {/* Fixed Image Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center sticky top-0 h-screen">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={tradingCards[activeIndex].image}
            alt={tradingCards[activeIndex].title}
            className="w-[400px] h-[400px] object-cover rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Scrolling Text Section */}
      <div className="flex-1">
        {tradingCards.map((card, index) => (
          <motion.div
            key={index}
            className="min-h-screen flex items-center justify-center snap-center px-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onViewportEnter={() => setActiveIndex(index)}
          >
            <div className="max-w-lg">
              <h2 className="text-5xl font-bold mb-4">{card.title}</h2>
              <p className="text-lg text-gray-300">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
