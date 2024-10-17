import { useEffect, useState } from "react";

const base_url = "https://api-review-site.onrender.com/api";

const useMultiFetch = (endpoints) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   resuable fetch with useEffect - dependency array with endpoints
  // promise all to resolve or fail as one
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    (async () => {
      try {
        if (!endpoints) return;

        const res = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`${base_url}${endpoint}`).then((res) => {
              return res.json();
            })
          )
        );

        setData(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [endpoints]);

  return { data, isLoading, error };
};

export default useMultiFetch;
