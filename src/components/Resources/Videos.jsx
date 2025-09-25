import React from "react";

const Videos = () => {
  const videos = [
    {
      id: 1,
      title: "Introduction to Trading",
      desc: "Learn the basics of trading, market types, and how to get started as a beginner.",
      thumbnail: "https://img.youtube.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
    },
    {
      id: 2,
      title: "Technical Analysis Basics",
      desc: "Understand candlestick charts, indicators, and how to predict market trends.",
      thumbnail: "https://img.youtube.com/vi/tZyIS3b8l1w/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=tZyIS3b8l1w",
    },
    {
      id: 3,
      title: "Risk Management in Trading",
      desc: "Protect your capital with position sizing, stop-loss, and diversification techniques.",
      thumbnail: "https://img.youtube.com/vi/1t_8lJrT3mE/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=1t_8lJrT3mE",
    },
    {
      id: 4,
      title: "Trading Psychology",
      desc: "Master emotions like fear and greed to stay disciplined in trading decisions.",
      thumbnail: "https://img.youtube.com/vi/VV6U0nYy_wM/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=VV6U0nYy_wM",
    },
    {
      id: 5,
      title: "Advanced Trading Strategies",
      desc: "Explore swing trading, scalping, and algorithmic strategies for experienced traders.",
      thumbnail: "https://img.youtube.com/vi/RxKMFqzH4DM/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=RxKMFqzH4DM",
    },
  ];

  return (
    <section className="bg-dark text-white py-16 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Trading <span className="text-green">Video Tutorials</span>
      </h1>

      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-6">
        Learn trading concepts through step-by-step video tutorials. Watch and
        master everything from beginner basics to advanced strategies.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-green transition transform hover:-translate-y-2"
          >
            <a href={video.link} target="_blank" rel="noopener noreferrer">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-green mb-2">
                {video.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {video.desc}
              </p>
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-green font-medium hover:underline"
              >
                Watch Video →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Videos;
