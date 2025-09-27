import React, { useEffect, useState } from "react";
import { MessageCircle, PlusCircle, Search } from "lucide-react";
import discussionsData from "../../assets/discussions";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const [search, setSearch] = useState("");
  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem("discussions");
    return saved ? JSON.parse(saved) : discussionsData;
  });
  const [filteredDiscussions, setFilteredDiscussions] = useState(discussions);
  const [isAddDiscussion, setIsAddDiscussion] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  // Handle onChange event of add Discussion form input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hnadle onSubmit formData
  const addDiscussion = (formData) => {
    setDiscussions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: "You",
        ...formData,
        date: new Date().toLocaleDateString(),
        comments: [],
      },
    ]);
  };

  // Filter Discussion based in the search
  const handleFilterDiscussion = (e) => {
    const filtered = discussions.filter(
      (d) =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.author.toLowerCase().includes(search.toLowerCase()) ||
        d.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDiscussions(filtered);
  };

  const categories = ["All", "Forex", "Stocks", "Crypto", "Options", "General"];

  useEffect(() => {
    localStorage.setItem("discussions", JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    handleFilterDiscussion();
  }, [search]);

  return (
    <section className="min-h-screen bg-dark text-white py-16 px-8 md:px-12 lg:px-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <button
          onClick={() => setIsAddDiscussion(true)}
          className="flex items-center gap-2 bg-transparent border hover:bg-green px-4 py-2 rounded-2xl shadow-lg duration-200 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Start Discussion
        </button>
      </div>

      {/* Search + Categories */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 flex items-center gap-3 bg-gray-800 rounded-2xl px-4 py-2 shadow">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 text-white"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => (cat === "All" ? setSearch("") : setSearch(cat))}
              className="px-4 py-2 bg-gray-800 hover:bg-green rounded-2xl whitespace-nowrap cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                navigate(`${d.id}`), scrollTo(0, 0);
              }}
              className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold cursor-pointer hover:text-green duration-200">
                  {d.title}
                </h2>
                <span className="text-sm bg-green/30 px-3 py-1 rounded-full">
                  {d.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Posted by <span className="text-green">{d.author}</span> •{" "}
                {d.date}
              </p>
              <div className="flex items-center gap-2 mt-4 text-gray-400">
                <MessageCircle className="w-5 h-5" />
                {d?.comments.length || 0} Replies
              </div>
            </div>
          ))
        ) : (
          <p className="min-h-100 text-3xl font-semibold text-gray-400 flex justify-center items-center">
            No Discussions found
          </p>
        )}
      </div>

      {/* Modal for add Discussion */}
      {isAddDiscussion && (
        <div className="fixed inset-0 backdrop-blur flex justify-center items-center shadow-2xl">
          <div className="w-100 bg-dark text-white p-6 rounded-lg space-y-4 pb-10">
            <h2 className="text-xl font-semibold">Share your thoughts</h2>

            <form className="space-y-4">
              {/* Category */}
              <div className="flex flex-col gap-1">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleOnChange}
                  required
                  className="border px-3 py-2 rounded-lg bg-dark"
                >
                  <option value="">Select Category</option>
                  <option value="forex">Forex</option>
                  <option value="options">Options</option>
                  <option value="crypto">Crypto</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleOnChange}
                  required
                  placeholder="Best Forex strategies in 2025?"
                  className="border px-3 py-2 rounded-lg"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleOnChange}
                  placeholder="Description"
                  className="border px-3 py-2 rounded-lg"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddDiscussion(false)}
                  className="w-full p-2 border rounded-lg cursor-pointer hover:text-green/90 duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => addDiscussion(formData)}
                  className="w-full p-2 bg-green rounded-lg cursor-pointer hover:bg-green/80 duration-200"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Community;
