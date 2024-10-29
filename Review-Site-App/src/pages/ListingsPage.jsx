import { useSearchParams, useLocation } from "react-router-dom";

import Container from "../components/Container";

import { useEffect, useState } from "react";

import { useGetListingsQuery } from "../services/businessesApi";

import ListingsCard from "../components/cards/ListingsCard";

import useInfiniteScroll from "../hooks/useInfiniteScroll";

import { DotLoader } from "react-spinners";

const ListingsPage = () => {
  // const [data, setData] = useState(null);

  // const [isLoading, setIsLoading] = useState(false);

  // const [error, setError] = useState(null);

  const [header, setHeader] = useState("");

  const [currentState, setCurrentState] = useState("");

  const [currentCity, setCurrentCity] = useState("");

  const [searchParams] = useSearchParams();

  const location = useLocation();

  // category Id from location state
  const { categoryId } = location.state;

  useEffect(() => {
    // get category type from search param - for header
    setHeader(searchParams.get("find_desc"));

    // get location from search param formatted as "city" + " " + "state".
    const paramLocation = searchParams.get("find_loc");

    // city will be last two characters of param
    const city = paramLocation.slice(-2);

    // -3 to grab beginning of string and slice until the space before city
    const state = paramLocation.slice(0, paramLocation.length - 3);

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

  // const { data, error, isLoading, isFetching } = useGetListingsQuery({
  //   categoryId,
  //   city: currentCity,
  //   state: currentState,
  //   limit: 10,
  // });

  const dataLabel = "businesses";

  const {
    items: businesses,
    error,
    isLoading,
    lastItemRef,
    isFetchingNextPage,
  } = useInfiniteScroll(
    useGetListingsQuery,
    {
      categoryId,
      city: currentCity,
      state: currentState,
      limit: 10,
    },
    dataLabel
  );

  const checkIsOpen = (open_time, close_time) => {
    // convert dates passed in and current date to total time in seconds (hours * seconds in an hour + minutes *... etc)
    const currentTime = new Date();
    // if(curr time > open time & curr time < close time) open
    // else close?
  };

  if (isLoading)
    return <div className="text-center pt-72 text-2xl">Loading Gang!</div>;

  // if (error) {
  //   console.error("Error fetching listings:", error);

  //   return <div>Error: {error.message}</div>;

  // }

  if (businesses) {
    for (let bus of businesses) {
      // console.log(bus.hours);
    }
    return (
      <div className="xl:pt-72 pt-44">
        <Container>
          <div>
            <h1 className="text-2xl tracking-wide leading-10 ml-6  ">
              {/* HAVE THIS TAKE {CHILDREN} */}
              Header - move to own component folder - results for {
                header
              } in {currentCity}, {currentState}
            </h1>
            <div className="lg:mx-52 mx-32">
              {businesses.map((business, idx) => (
                <div
                  key={business.id}
                  // check if at end of currently fetched businesses list to apply lastItemRef for infiniteScroll
                  ref={idx === businesses.length - 1 ? lastItemRef : null}
                  className="pb-8"
                >
                  <ListingsCard
                    business={business}
                    idx={idx + 1}
                    searchParams={searchParams}
                  />
                </div>
              ))}
              {isFetchingNextPage && (
                <div className="py-8 flex justify-center">
                  <DotLoader size={30} color="#cccccc" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
};

export default ListingsPage;
