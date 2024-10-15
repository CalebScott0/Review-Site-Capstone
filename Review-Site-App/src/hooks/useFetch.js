import { useEffect, useState } from "react";

const base_url = "https://api-review-site.onrender.com/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState();

  //   resuable fetch with useEffect - dependency array with endpoint to activate on endpoint change
  useEffect(() => {
    (async () => {
      const res = await fetch(`${base_url}${endpoint}`);
      const json = await res.json();
      setData(json);
    })();
  }, [endpoint]);

  return [data];
};

export default useFetch;
