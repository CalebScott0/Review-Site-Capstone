import { useEffect, useState } from "react";

const base_url = "https://api-review-site.onrender.com/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   resuable fetch with useEffect - dependency array with endpoint to activate on endpoint change
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(`${base_url}${endpoint}`);
        const json = await res.json();
        setData(json);
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
