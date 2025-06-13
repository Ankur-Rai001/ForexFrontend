import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../api/getAllArticles";
import { ClockIcon, UserIcon } from "lucide-react";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllArticles();
      setArticles(data?.articles || []);
    })();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-950 text-white pb-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-5 text-center">Latest Articles</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300"
            >
              <img
                src={`https://api.forexedge.in/${article.imageURL.replace(
                  "static/",
                  ""
                )}`}
                alt={article.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-purple-400">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-400">
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span>{article.authorName}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(article.createdAt)}</span>{" "}
                      {/* use your date formatter */}
                    </div>
                  </div>
                </p>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {article.metaTitle}
                </p>

                <Link
                  to={`/articles/${article.id}`}
                  className="mt-auto text-sm font-medium text-purple-400 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
