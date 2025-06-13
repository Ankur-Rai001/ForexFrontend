import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getJWTToken } from "../api/graphApi";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = await getJWTToken();
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/article/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch article");
        const data = await res.json();
        setArticle(data.article);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>;
  if (!article)
    return (
      <div className="text-red-500 text-center mt-10">Article not found.</div>
    );

  const imageUrl = `https://api.forexedge.in/${article.imageURL.replace(
    "static/",
    ""
  )}`;

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-4 md:px-10">
      <Helmet>
        <title>{article.metaTitle || article.title}</title>
        <meta
          name="description"
          content={article.metaKeyword || article.title}
        />
        <meta
          property="og:title"
          content={article.metaTitle || article.title}
        />
        <meta
          property="og:description"
          content={article.metaKeyword || article.title}
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.forexedge.in/articles/${article.articleSeoUrl}`}
        />
        <link
          rel="canonical"
          href={`https://www.forexedge.in/articles/${article.articleSeoUrl}`}
        />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <div className="text-sm text-gray-400 mb-4">
          By{" "}
          <span className="text-white font-semibold">{article.authorName}</span>{" "}
          |{" "}
          {new Date(article.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        {article.imageURL && (
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full max-h-[400px] object-cover rounded mb-6"
          />
        )}

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
