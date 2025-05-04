export const fetcher = async ({ url, method = "GET", body = null, headers = {} }) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };
  
      if (body) {
        options.body = typeof body === "string" ? body : JSON.stringify(body);
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLUB_BASE_URL}${url}`, options);
  
      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      const result = isJson ? await response.json() : await response.text();
  
      if (!response.ok) {
        const error = new Error(result?.message || response.statusText);
        error.status = response.status;
        error.details = result;
        throw error;
      }
  
      return isJson ? result : { result };
    } catch (err) {
      console.error("Fetcher error:", err);
      throw err;
    }
  };
  