import { useEffect, useState } from "react";

// const base_url = "http://localhost:8080/api";
const base_url = "https://api-review-site.onrender.com/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   resuable fetch with useEffect - dependency array with endpoint
  // promise all to resolve or fail as one
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    (async () => {
      try {
        if (!endpoint) return;

        const res = await fetch(`${base_url}${endpoint}`);
        const data = await res.json();

        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useFetch;
