import React, { useRef, useState } from "react";

const Guides = () => {
  const guides = [
    {
      title: "Beginner's Guide",
      faqs: [
        {
          q: "What is trading and how does it work?",
          a: "Trading is the act of buying and selling financial assets like stocks, forex, or crypto in order to make a profit from price changes.",
        },
        {
          q: "What types of markets exist?",
          a: "Markets include Stocks, Forex, Crypto, Futures, and Options. Each has unique characteristics, risks, and trading styles.",
        },
        {
          q: "What are common trading terminologies?",
          a: "Terms include Bullish (expecting prices to rise), Bearish (expecting prices to fall), Long (buying to profit from rise), and Short (selling to profit from fall).",
        },
        {
          q: "How do I place my first trade?",
          a: "Choose a trading platform, select an asset, decide whether to buy or sell, set your investment amount, and confirm the trade.",
        },
      ],
    },
    {
      title: "Technical Analysis",
      faqs: [
        {
          q: "What are candlestick charts?",
          a: "Candlestick charts display price movement in a visual format showing open, close, high, and low prices for a given period.",
        },
        {
          q: "What is support and resistance?",
          a: "Support is a price level where demand is strong enough to stop price from falling, while resistance is where selling pressure prevents price from rising.",
        },
        {
          q: "What are popular indicators?",
          a: "Common indicators include Moving Averages, RSI, MACD, and Bollinger Bands, which help identify trends and momentum.",
        },
        {
          q: "What are chart patterns?",
          a: "Patterns like Head & Shoulders, Double Tops, and Triangles indicate potential reversals or continuations of trends.",
        },
      ],
    },
    {
      title: "Risk Management",
      faqs: [
        {
          q: "What is position sizing?",
          a: "Position sizing determines how much of your capital to risk in a trade, usually 1–2% of your account per trade.",
        },
        {
          q: "What is a stop-loss order?",
          a: "A stop-loss order automatically closes your trade at a set level to limit potential losses.",
        },
        {
          q: "Why is diversification important?",
          a: "Diversification spreads your investments across different assets to reduce overall risk.",
        },
        {
          q: "What is leverage risk?",
          a: "Leverage amplifies gains but also increases losses. Overusing leverage can wipe out accounts quickly.",
        },
      ],
    },
    {
      title: "Psychology of Trading",
      faqs: [
        {
          q: "Why is psychology important in trading?",
          a: "Emotions like fear and greed can cause impulsive decisions. Managing emotions ensures discipline.",
        },
        {
          q: "How do I stick to a trading plan?",
          a: "Write down entry/exit rules, risk management, and review your trades in a journal to build consistency.",
        },
        {
          q: "What is FOMO in trading?",
          a: "FOMO (Fear Of Missing Out) is the urge to enter a trade late, which often leads to losses.",
        },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const contentRef = useRef([]);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-dark text-white py-16 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Complete Trading <span className="text-green">Guide</span>
      </h1>

      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-8">
        Explore trading knowledge step by step. Click on a question to reveal
        the answer and deepen your understanding of each concept.
      </p>

      {guides.map((guide, guideIdx) => (
        <div key={guideIdx} className="mb-12">
          <h2 className="text-2xl font-semibold text-green mb-6">
            {guide.title}
          </h2>
          <div className="space-y-4">
            {guide.faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg transition-colors duration-300 cursor-pointer border ${
                  openIndex === index
                    ? "border-gray-600 bg-gray-900"
                    : "bg-gray-800 border-transparent"
                }`}
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center px-6 py-4 text-white font-medium">
                  <span>{faq.q}</span>
                  <span className="text-green text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
                <div
                  ref={(el) => (contentRef.current[index] = el)}
                  className="overflow-hidden transition-all duration-300 px-6"
                  style={{
                    maxHeight:
                      openIndex === index
                        ? contentRef.current[index]?.scrollHeight + "px"
                        : "0px",
                  }}
                >
                  <p className="pb-4 text-sm text-gray-300">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Guides;
