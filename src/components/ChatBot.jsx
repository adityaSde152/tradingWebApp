import React, { useEffect, useRef, useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import axios from "axios";
import { MdSend } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import assets from "../assets/assets";

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
            className="text-green hover:underline text-sm ml-1"
          >
            read less
          </button>
        </>
      ) : (
        <>
          {text.slice(0, limit)}...{" "}
          <button
            onClick={() => setExpanded(true)}
            className="text-green hover:underline text-sm ml-1"
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
  const messageEndRef = useRef(null);

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
    "How can I contact support?",
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
    setShowCommonQuestions(false);
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

      botText = botText
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/\s+/g, " ")
        .trim();

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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-51">
      {!isOpen && (
        <button
          className="bg-green hover:bg-green/90 cursor-pointer text-white p-4 rounded-full shadow-lg duration-200"
          onClick={toggleChat}
        >
          <FaRobot size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-[500px] lg:max-h-[76vh] bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-tr from-green-600 to-green-400 w-full text-white flex flex-col justify-between items-start p-4">
            <div className="flex justify-between w-full">
              <h2 className="text-2xl font-semibold text-green bg-white w-12 h-12 flex justify-center items-center rounded-full">
                <img src={assets.logo} alt="" />
              </h2>
              <button className="cursor-pointer bg-white/50 w-6 h-6 flex justify-center items-center rounded-full hover:bg-red-400 duration-300">
                <RxCross2 className="text-xl" onClick={toggleChat} />
              </button>
            </div>
            <h2 className="text-xl font-semibold">BinaryV AI</h2>
            <p className="text-sm text-gray-200">Your AI trading assistant.</p>
          </div>

          {/* Message Area */}
          <div className={`flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50`}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex  ${
                  msg.sender === "user" ? "justify-end" : " justify-start"
                }`}
              >
                {/* Bot message */}
                {msg.sender === "bot" && (
                  <div className="flex items-start gap-1 max-w-[90%]">
                    {/* Bot Icon */}
                    <div className="bg-green min-w-6 h-6  flex justify-center items-center rounded-full text-white">
                      <FaRobot size={12} />
                    </div>
                    {/* Bot Message */}
                    <div>
                      <h3 className="font-semibold text-xs">Assistant</h3>
                      <div className="px-3 py-1 rounded-lg  text-xs bg-gray-800  text-white rounded-tl-none">
                        <TruncatedMessage text={msg.text} />{" "}
                      </div>
                    </div>
                  </div>
                )}

                {/* User message */}
                {msg.sender === "user" && (
                  <div className="px-3 py-2 rounded-lg bg-green text-white text-xs max-w-[80%] rounded-br-none">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="bg-green flex w-8 h-8 justify-center items-center rounded-full text-white">
                  <FaRobot size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Assistant</h3>
                  <div className="flex gap-1 px-3 py-2 bg-gray-800 rounded-lg w-16">
                    <span className="w-2 h-2 rounded-full bg-green animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-green animate-bounce delay-150"></span>
                    <span className="w-2 h-2 rounded-full bg-green animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messageEndRef}></div>
          </div>

          {/* Common Questions */}
          {showCommonQuestions && (
            <div className="px-4 overflow-y-auto bg-gray-50 max-h-80">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">Common Questions:</p>
                <button
                  onClick={() => setShowCommonQuestions(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {/* <RxCross2 className="text-xl" /> */}
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

          <div className="flex items-center p-2 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="Type a message..."
              className="flex-1 px-3  focus:outline-none"
            />

            <MdSend
              onClick={() => generate()}
              className="text-3xl mr-4 text-green"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
