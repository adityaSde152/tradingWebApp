import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import articles from "../../assets/articles";

const ArticlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen text-4xl text-white/70">
        Article not found.
      </div>
    );
  }

  return (
    <section className="px-8 py-16 max-w-5xl mx-auto text-white">
      <button
        className="flex items-center gap-2 text-green mb-6 hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-xl md:text-3xl font-bold mb-2">{article.title}</h1>
      <div className="flex gap-4 text-sm text-green mb-6">
        <span>By {article.author}</span>
        <span>{article.date}</span>
      </div>

      <img
        src={article.image}
        alt={article.title}
        className="w-full h-[400px] object-cover rounded-lg mb-6"
      />

      <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-line">
        {article.content}
      </div>
    </section>
  );
};

export default ArticlePage;
