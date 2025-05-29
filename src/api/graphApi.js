export const graphApi = async (currency, interval) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "6no!r0#)gf(y%$9fb#u*9_!t=!8v5_sorv8k^nzs!5gwcxj#v!"
      },
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
