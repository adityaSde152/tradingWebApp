import React from "react";
import { ArrowRight } from "lucide-react";
import articles from "../../assets/articles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};
const AllArticle = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 px-8 text-white">
      {/* Recent Article Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold">All Articles</h2>

        <div
          className={`grid grid-cols-1 space-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 scrollbar-hide mt-8`}
        >
          {articles.map((article) => (
            <motion.div
              key={article.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: article.id * 0.15,
                ease: "easeOut",
              }}
              className="rounded-lg space-y-2 border border-gray-600 p-4 hover:scale-95 duration-300 transition"
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
                onClick={() => navigate(`/blog/${article.id}`)}
                className="text-green flex items-center gap-1 hover:text-green/90 cursor-pointer"
              >
                Read more <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllArticle;
