import { getJWTToken } from "./graphApi";

export const getAllArticles = async () => {
  try {
    const token = await getJWTToken();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/articles`, {
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch articles");

    return await res.json();
  } catch (err) {
    console.error("Error fetching articles:", err);
    return { articles: [] };
  }
};
