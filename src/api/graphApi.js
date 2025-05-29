// src/api/graphApi.js
export const graphApi = async (currency, interval) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currency, interval }),
    });

    if (!response.ok) {
      throw new Error("API response was not OK");
    }

    const result = await response.json();
    return result?.imageurl || null;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
