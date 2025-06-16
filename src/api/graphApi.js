// Step 1: Get JWT token (only once, for example on page load or login)
export const getJWTToken = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/get-token`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch JWT token");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Token fetch error:", error);
    throw error;
  }
};

// Step 2: Use the JWT token to call the protected /predict endpoint
export const graphApi = async (currency, interval, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token, // JWT token from getJWTToken()
      },
      body: JSON.stringify({ currency, interval }),
    });

    if (!response.ok) {
      throw new Error("Unauthorized or token expired");
    }

    const result = await response.json();
    return result?.imageurl || null;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const login= async(username, password,token)=> {
  try{
   const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token, // JWT token from getJWTToken()
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Unauthorized or token expired");
    }

    const result = await response.json();
    return result || null;
  } catch (error) {
    console.error("API Error:", error);
    throw error; 
  }

}



