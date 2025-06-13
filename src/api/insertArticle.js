import { getJWTToken } from "./graphApi";

export const insertArticle = async (articleData) => {
  try {
    const token = await getJWTToken();

    const formData = new FormData();
    formData.append("title", articleData.title);
    formData.append("content", articleData.content);
    formData.append("authorName", articleData.authorName);
    formData.append("articleSeoUrl", articleData.articleSeoUrl);
    formData.append("metaTitle", articleData.metaTitle);
    formData.append("metaKeyword", articleData.metaKeyword);
    formData.append("createdBy", articleData.authorName);
    formData.append("updatedBy", articleData.authorName);
    formData.append("isDeleted", articleData.isDeleted);

    if (articleData.imageFile) {
      formData.append("image", articleData.imageFile, articleData.imageFile.name);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/insert-article`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to insert article");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Insert Article Error:", error);
    throw error;
  }
};