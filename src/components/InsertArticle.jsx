import React, { useState, useEffect } from "react";
import { insertArticle } from "../api/insertArticle";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../api/graphApi";

const InsertArticle = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    authorName: "",
    articleSeoUrl: "",
    metaTitle: "",
    metaKeyword: "",
    imageFile: null,
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Handle article form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title") {
      const seoUrl = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setForm((prev) => ({
        ...prev,
        title: value,
        articleSeoUrl: seoUrl,
      }));
    } else if (name === "imageFile") {
      setForm((prev) => ({ ...prev, imageFile: e.target.files[0] }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleEditorChange = (content) => {
    setForm((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await insertArticle(form);
      toast.success("✅ Article submitted successfully!");
      setForm({
        title: "",
        content: "",
        authorName: "",
        articleSeoUrl: "",
        metaTitle: "",
        metaKeyword: "",
        imageFile: null,
      });
    } catch (error) {
      toast.error("❌ Submission failed.");
    }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(loginForm.username, loginForm.password, token);
      if (result) {
        setIsAuthenticated(true);
        setShowLogin(false);
        toast.success("🔓 Login successful.");
      }
    } catch (err) {
      toast.error("❌ Login failed. Invalid credentials.");
    }
  };

  return (
    <div className="bg-gray-900 text-white py-10 min-h-screen relative">
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={loginForm.username}
                  onChange={handleLoginInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Article Insertion Form */}
      {isAuthenticated && (
        <div className="w-full max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Insert Article</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block mb-1 font-medium">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleChange}
                placeholder="Meta Title"
                className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              />
            </div>

            {/* Meta Keyword */}
            <div>
              <label className="block mb-1 font-medium">Meta Keyword</label>
              <input
                type="text"
                name="metaKeyword"
                value={form.metaKeyword}
                onChange={handleChange}
                placeholder="Meta Keyword"
                className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              />
            </div>

            {/* Author Name */}
            <div>
              <label className="block mb-1 font-medium">Author Name</label>
              <input
                type="text"
                name="authorName"
                value={form.authorName}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-1 font-medium">Content</label>
              <Editor
                apiKey="49tn26rnb8w336ieq1lomz1pueqgctbldj08ofsyczozknos"
                value={form.content}
                onEditorChange={handleEditorChange}
                init={{
                  height: 300,
                  skin: "oxide-dark",
                  content_css: "dark",
                  plugins: "autolink link image lists media table wordcount",
                  toolbar:
                    "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media",
                }}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-1 font-medium">Upload Image</label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              />
              {form.imageFile && (
                <img
                  src={URL.createObjectURL(form.imageFile)}
                  alt="Preview"
                  className="mt-2 max-h-48 rounded"
                />
              )}
            </div>

            {/* SEO URL */}
            <div>
              <label className="block mb-1 font-medium">Article SEO URL</label>
              <input
                type="text"
                name="articleSeoUrl"
                value={form.articleSeoUrl}
                readOnly
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-400"
              />
              {form.articleSeoUrl && (
                <p className="text-sm text-gray-400 mt-1">
                  Preview:{" "}
                  <span className="text-green-400">
                    /articles/{form.articleSeoUrl}
                  </span>
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 px-6 py-2 rounded cursor-pointer text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default InsertArticle;
