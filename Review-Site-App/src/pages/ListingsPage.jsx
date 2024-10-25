import { useSearchParams, useLocation } from "react-router-dom";
import Container from "../components/Container";
import { useCallback, useEffect, useState } from "react";
import { useGetListingsQuery } from "../redux/api";
import ListingsCard from "../components/cards/ListingsCard";

const ListingsPage = () => {
  // const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [header, setHeader] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  // category Id from location state
  const { categoryId } = location.state;
  useEffect(() => {
    // get category type from search param - for header
    setHeader(searchParams.get("find_desc"));
    // get location from search param formatted as "city" + " " + "state".
    const paramLocation = searchParams.get("find_loc").slice(0);
    const city = paramLocation.slice(0, paramLocation.indexOf(" "));
    const state = paramLocation.slice(paramLocation.indexOf(" ") + 1).trim();
    setCurrentLocation(`${city}, ${state}`);
    setCurrentCity(city);
    setCurrentState(state);

    // setIsLoading(true);
    // setError(null);
    // (async () => {
    //   try {
    //     const res = await fetch(
    //       `https://api-review-site.onrender.com/api/businesses/categories/${categoryId}?city=${city}&state=${state}&limit=10&offset=0`
    //     );
    //     const data = await res.json();

    //     setData(data);
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // })();
    // }, [searchParams, categoryId]);
  }, [searchParams]);
  const { data, error, isLoading } = useGetListingsQuery({
    categoryId,
    city: currentCity,
    state: currentState,
  });

  // isLoading &&

  if (data)
    return (
      <div className="pt-40">
        <Container>
          <div>
            <div className="text-2xl tracking-wide leading-10 ml-6  ">
              {/* HAVE THIS TAKE {CHILDREN} */}
              Header - move to own component folder - results for {
                header
              } in {currentLocation} {data.businesses[0].name}
            </div>
            {data.businesses.map((business, idx) => (
              <ListingsCard
                className="cursor-pointer"
                key={business.id}
                business={business}
                idx={idx + 1}
              />
            ))}
          </div>
        </Container>
      </div>
    );
};

export default ListingsPage;
