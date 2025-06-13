import React, { useState } from "react";
import { insertArticle } from "../api/insertArticle";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InsertArticle = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    authorName: "",
    articleSeoUrl: "",
    metaTitle: "",
    metaKeyword: "",
    imageFile: null,
  });

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
    setForm((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await insertArticle(form);
      toast.success("Article submitted successfully!");
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

  return (
    <div className="bg-gray-900 text-white py-10 min-h-screen">
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
    </div>
  );
};

export default InsertArticle;
