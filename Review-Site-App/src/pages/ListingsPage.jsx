// USE CONTAINER
import { useSearchParams, useLocation } from "react-router-dom";
import Container from "../components/Container";
import { useCallback, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const ListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    // get category type from search param
    const searchTerm = searchParams.get("find_desc");
    console.log(searchTerm);
    // get location from search param formatted as "city" + " " + "state".
    const location = searchParams.get("find_loc").slice(0);

    const city = location.slice(0, location.indexOf(" "));
    const state = location.slice(location.indexOf(" ") + 1).trim();
    console.log(city + ", " + state);
  }, [searchParams]);
  // pass category Id state from location
  // const { data, isLoading, error } = useFetch(
  //   `/businesses/categories/${location.state.categoryId}`
  // );
  // data && console.log(data);

  //   MAKE ONE /search route with serach parameters like yelp!!

  //   data && console.log(data);
  return (
    <div className="pt-40">
      <Container>
        <div className="text-2xl tracking-wide leading-10 ml-6  ">
          Header - move to own component folder
        </div>
      </Container>
    </div>
  );
};

export default ListingsPage;
