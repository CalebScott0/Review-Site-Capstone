import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchState = () => {
  // grab category from location state
  // const { state } = useLocation();

  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [currentState, setCurrentState] = useState("");

  const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    // categoryId from searchParams
    setCategoryId(searchParams.get("with_id"));
    // get category type from search param - for header
    const formattedCategory = searchParams.get("find_desc");

    setCategory(formattedCategory);

    // get location from search param formatted as "city" + " " + "state".
    const paramLocation = searchParams.get("find_loc");

    // state will be last two characters of param
    const state = paramLocation?.slice(-2);

    // city will be every character before last 3 characters (state plus space)
    const city = paramLocation?.slice(0, paramLocation.length - 3);

    setCurrentCity(city);

    setCurrentState(state);
  }, [searchParams]);

  return { category, categoryId, currentCity, currentState };
};

export default useSearchState;
