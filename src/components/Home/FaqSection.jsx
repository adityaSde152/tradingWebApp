import React, { useState } from 'react';

const faqs = [
  {
    question: "Where is Codex based?",
    answer:
      "Get paid for free from countries in the EU, Asia, and the US. There are no deposit charges. Create an account in your preferred currency and share the details to get paid. We make it easy to go international.",
  },
  { question: "What are the fees charged by Codex?", answer: "" },
  { question: "How does Codex make money?", answer: "" },
  { question: "How does Codex generate the returns I earn?", answer: "" },
  { question: "What countries does Codex cover?", answer: "" },
  { question: "How do I fund my Codex account?", answer: "" },
  { question: "How do I withdraw from my Codex account?", answer: "" },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#0b0f1a]  h-full my-4 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-white text-3xl font-bold text-center mb-6">FAQs Section</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg transition-colors duration-300 cursor-pointer border ${
                openIndex === index ? 'border-gray-600 bg-gray-900' : 'bg-gray-800 border-transparent'
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center px-4 py-2 text-white font-medium text-base">
                <span>{faq.question}</span>
                <span className="text-gray-400 text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              {openIndex === index && faq.answer && (
                <div className="px-4 pb-4 text-sm text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
