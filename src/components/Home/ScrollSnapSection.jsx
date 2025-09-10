import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import assets from "../../assets/assets"; // your images

gsap.registerPlugin(ScrollTrigger);

const tradingCards = [
  {
    title: "Live Data",
    description: "Monitor the markets in real-time for smarter decisions.",
    image: assets.Mobile_img8,
  },
  {
    title: "Instant Payouts",
    description: "Withdraw your profits quickly and securely, anytime.",
    image: assets.Mobile_img2,
  },
  {
    title: "Smart Tools",
    description: "Analyze trends and trade confidently with AI-powered tools.",
    image: assets.Mobile_img3,
  },
  {
    title: "Advanced Charts",
    description: "Visualize market trends with advanced charts.",
    image: assets.Mobile_img4,
  },
  {
    title: "AI Alerts",
    description: "Get notified of trading opportunities instantly.",
    image: assets.Mobile_img5,
  },
  {
    title: "Secure Wallet",
    description: "Store your assets safely with secure wallets.",
    image: assets.Mobile_img6,
  },
];

export default function Scroll() {
  const containerRef = useRef(null);
  const textWrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const totalHeight = tradingCards.length * window.innerHeight;

    gsap.to(textWrapperRef.current, {
      y: () => `-${window.innerHeight * (tradingCards.length - 1)}px`,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalHeight}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (tradingCards.length - 1));
          setActiveIndex(index);
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full  h-screen bg-[#0B0F1A] text-white flex overflow-hidden  ">
      {/* Left Side: Image */}
      <div className="hidden md:flex w-1/2  items-center justify-center sticky top-0 h-screen">
        <img
          src={tradingCards[activeIndex].image}
          alt={tradingCards[activeIndex].title}
          className="w-[400px] h-[400px] object-contain rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Side: Text */}
      <div className="flex-1">
        <div ref={textWrapperRef} className="flex flex-col w-full">
          {tradingCards.map((card, idx) => (
            <div
              key={idx}
              className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
            >
              <h2 className="text-5xl font-bold mb-4">{card.title}</h2>
              <p className="text-lg text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
