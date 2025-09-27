import React, { useRef, useState } from "react";
import assets from "../assets/assets";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import articles from "../assets/articles";

const Blog = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className=" bg-dark text-white px-8 pt-16">
      {/* Featured Blog */}
      <div className=" py-2 px-4 grid md:grid-cols-2 gap-4">
        {/* Right Image box */}

        <div>
          <img
            src={articles[0].image}
            alt="Featured"
            className="rounded-xl shadow-md xl:w-full xl:h-100"
          />
        </div>
        {/* Left Content box */}
        <div className=" w-full h-full md:px-4 py-4 md:py-12 space-y-3">
          <div className="flex items-center gap-2 ">
            <span className="px-3 py-1 bg-gray-600 text-green text-sm rounded-full">
              News!
            </span>
            <span className="text-sm">8 Min Read</span>
          </div>
          <h2 className="text-xl md:text-3xl font-semibold">
            Unlocking Efficiency: The Power Of A Modern POS System
          </h2>
          <p className="text-gray-400 xl:max-w-[80%]">
            In today’s fast-paced business landscape, efficiency is key to
            success. From small local shops to large-scale enterprises,
            businesses are constantly seeking ways to streamline their
            operations and enhance customer experience...
          </p>
          <button
            onClick={() => navigate(`${articles[0].id}`)}
            className="text-green flex items-center gap-1 hover:text-green/90 cursor-pointer"
          >
            Read more <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Recent Article Section */}
      <div className="mt-12">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Our Recent Articles</h2>

          <div className="space-x-3">
            <button
              onClick={() => scroll("left")}
              className="bg-gray-400 rounded-full p-1 cursor-pointer hover:scale-102 duration-200 hover:bg-green"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-gray-400 rounded-full p-1 cursor-pointer hover:scale-102 duration-200 hover:bg-green"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={`flex gap-8 overflow-x-auto scrollbar-hide mt-8 px-4`}
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="min-w-[300px] rounded-lg space-y-3 border border-gray-600 p-4 hover:scale-95 duration-300 transition"
            >
              <img
                src={article.image}
                alt={article.title}
                className="rounded-lg mb-4 w-full h-44"
              />
              <div className="flex justify-between">
                <span className="text-green">{article.author}</span>
                <span>{article.date}</span>
              </div>
              <h2 className="font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-400">{article.desc}</p>
              <button
                onClick={() => navigate(`${article.id}`)}
                className="text-green flex items-center gap-1 hover:text-green/90 cursor-pointer"
              >
                Read more <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* View All Article */}
      <div className="flex justify-center items-center my-12">
        <button
          onClick={() => {
            navigate("all");
          }}
          className="px-5 py-2 bg-green rounded-lg cursor-pointer"
        >
          View All Articles
        </button>
      </div>
    </section>
  );
};

export default Blog;
