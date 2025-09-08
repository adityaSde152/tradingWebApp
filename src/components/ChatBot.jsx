import React, { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import axios from "axios";

//System Prompt
const SYSTEM_PROMPT = `
You are BinaryBot, the official AI support assistant for BinaryEdge — a modern binary options trading platform that allows users to profit by predicting market movements with precision and speed.

BinaryEdge offers the following features:
- Real-time binary options trading across multiple asset classes (forex, crypto, stocks)
- Customizable trading durations (from 30 seconds to hours)
- High payouts for accurate predictions
- Demo mode for practice trading without real money
- Fast deposits and withdrawals via bank, UPI, crypto, and cards
- Multi-level referral program with commission tracking
- Risk management tools and trade history
- Market analysis and trading signals
- Responsive web app and mobile access
- 24/7 customer support

As the BinaryBot assistant, your job is to provide friendly, professional, and accurate support to users. You can answer questions about:
- How binary trading works
- How to sign up and verify an account
- How to place a binary trade
- Deposit and withdrawal methods
- Demo vs. real accounts
- Safety and regulation
- Profit/loss calculation
- Trading strategies and indicators
- Referral program details
- Support channels and availability

Avoid giving investment advice. If a question is outside the scope of BinaryEdge's platform or policies, politely guide users to contact support.
`;

// TruncatedMessage Component
const TruncatedMessage = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 50;

  if (text.length <= limit) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {expanded ? (
        <>
          {text}{" "}
          <button
            onClick={() => setExpanded(false)}
            className="text-blue-600 hover:underline text-sm ml-1"
          >
            read less
          </button>
        </>
      ) : (
        <>
          {text.slice(0, limit)}...{" "}
          <button
            onClick={() => setExpanded(true)}
            className="text-blue-600 hover:underline text-sm ml-1"
          >
            more
          </button>
        </>
      )}
    </span>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCommonQuestions, setShowCommonQuestions] = useState(true);

  const toggleChat = () => setIsOpen(!isOpen);

 const commonQuestions = [
  "How does binary trading work?",
  "How do I place a trade on BinaryEdge?",
  "What assets can I trade?",
  "What is the minimum deposit amount?",
  "Is there a demo mode?",
  "How fast are withdrawals processed?",
  "Is BinaryEdge regulated and secure?",
  "What strategies can I use?",
  "How does the referral program work?",
  "How can I contact support?"
];


  const handleCommonQuestionClick = (question) => {
    setInput(question);
    setShowCommonQuestions(false);
    generate(question);
  };

  const generate = async (overrideInput) => {
    const query = overrideInput || input;
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      console.log(`${SYSTEM_PROMPT}\nUser: ${query}`);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=AIzaSyAFACnz-i5LF-W6BCyD_Abqw5hC8dkQtYA`,
        {
          contents: [
  {
    parts: [{ text: `${SYSTEM_PROMPT}\nUser: ${query}` }],
  },
],

        }
      );

      let botText =
        response.data.candidates[0].content.parts[0].text || "No response";

      botText = botText.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ").trim();

      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          className="bg-[#38D300] hover:bg-[#38D300] text-white p-4 rounded-full shadow-lg"
          onClick={toggleChat}
        >
          <FaRobot size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col overflow-hidden">
          <div className="bg-[#38D300] text-white flex justify-between items-center p-3">
            <h2 className="text-lg font-semibold">Trade AI</h2>
            <FaTimes className="cursor-pointer" onClick={toggleChat} />
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-200 self-start text-left"
                }`}
              >
                {msg.sender === "bot" ? (
                  <TruncatedMessage text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isTyping && (
              <div className="p-2 rounded-lg max-w-xs bg-gray-200 self-start text-left italic text-gray-500">
                Typing...
              </div>
            )}
          </div>

          {showCommonQuestions && (
            <div className="p-2 border-t bg-gray-100">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">Common Questions:</p>
                <button
                  onClick={() => setShowCommonQuestions(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleCommonQuestionClick(question)}
                    className="bg-gray-200 text-sm px-3 py-1 rounded-full hover:bg-gray-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center p-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-l-full focus:outline-none"
            />
            <button
              onClick={() => generate()}
              className="bg-[#38D300] text-white px-4 py-2 rounded-r-full "
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
