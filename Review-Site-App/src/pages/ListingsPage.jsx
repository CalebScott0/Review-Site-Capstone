import { useSearchParams, useLocation } from "react-router-dom";

import Container from "../components/Container";

import { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useGetListingsQuery } from "../services/businessesApi";

import ListingsCard from "../components/cards/ListingsCard";

import ListingsMap from "../components/ListingsMap";

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

  const { state } = useLocation();

  const navigate = useNavigate();

  // category Id from location state
  const { categoryId } = state;

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

  const handleCardClick = useCallback(
    ({ businessId, businessName }) => {
      // stop function if no business id or name
      if (!businessId || !businessName) return;

      // reformat name to be enhance url with dashes instead of spaces
      const splitName = businessName.split(" ");
      const joinNameWithDashes = splitName.join("-");
      // navigate to single business page passing id in state
      navigate(`/business/${joinNameWithDashes}`, {
        state: {
          businessId,
        },
      });
    },
    [navigate]
  );
  const dataLabel = "businesses";

  const {
    items: businesses,
    locationCoordinates,
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
  // navigate to new cateogry on category badge  click
  const handleCategoryClick = useCallback(
    ({ id, categoryName }) => {
      // stop function if no id or categoryName
      if (!id || !categoryName) return;
      // grab location search param from url
      const locationParam = searchParams.get("find_loc");
      // navigate with category name and id in state passed from badge click
      navigate(`/search?find_desc=${categoryName}&find_loc=${locationParam}`, {
        // pass category id in location state
        state: {
          categoryId: id,
        },
      });
    },
    [searchParams, navigate]
  );

  const daysOfWeekMap = new Map();

  const daysOfWeekArray = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  // create map of days of week and corresponding values 0-6 for Sunday - Saturday
  daysOfWeekArray.map((val, idx) => daysOfWeekMap.set(idx, val));

  // MOVE THIS TO SEPARATE FOLDER?
  const checkIsOpen = (hoursArray) => {
    // grab current day string from map
    const currentDate = new Date();
    const currentDay = daysOfWeekMap.get(currentDate.getDay());

    // find record for a businesses' hours for the current day
    const todaysHours = hoursArray?.find(
      (item) => item.day_of_week === currentDay
    );
    // if business has no hours for particular day, assume them to be closed
    if (!todaysHours)
      return <p className="text-sm text-rose-600 font-bold">Closed Today</p>;

    // convert today's hours to a date object for business
    const closingHour = new Date(todaysHours.close_time);

    const openingHour = new Date(todaysHours.open_time);

    // convert dates passed in and current date to total time in seconds (hours * seconds in an hour + minutes *... etc)
    const currTimeInSeconds =
      currentDate.getHours() * Math.pow(60, 2) +
      currentDate.getMinutes() * 60 +
      currentDate.getSeconds();

    const closingTimeInSeconds =
      closingHour.getHours() * Math.pow(60, 2) + closingHour.getMinutes() * 60;

    const openingTimeInSeconds =
      openingHour.getHours() * Math.pow(60, 2) + openingHour.getMinutes() * 60;

    if (
      closingTimeInSeconds > currTimeInSeconds &&
      openingTimeInSeconds < currTimeInSeconds
    ) {
      return (
        <p className="text-sm">
          <span className="font-bold text-emerald-600">Open</span> until{" "}
          {closingHour.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      );
    }
    // Return for else will reference opening hour of next day
    else {
      const tomorrow = daysOfWeekMap.get(currentDate.getDay() + 1);
      // find tomorrows hours for business
      // ADD HANDLING IF NO HOURS FOR TOMOROW
      const tomorrowHours = hoursArray?.find(
        (item) => item.day_of_week === tomorrow
      );

      const tomorrowOpeningHour = new Date(
        tomorrowHours.open_time
      ).toLocaleTimeString([], {
        // return hours and minutes
        hour: "numeric",
        minute: "2-digit",
      });

      return (
        <p className="text-sm">
          <span className="text-rose-600 font-bold">Closed </span>
          until {tomorrowOpeningHour} tomorrow
        </p>
      );
    }
  };

  if (isLoading)
    return <div className="text-center pt-72 text-2xl">Loading Gang!</div>;

  // if (error) {
  //   console.error("Error fetching listings:", error);

  //   return <div>Error: {error.message}</div>;

  // }
  if (businesses) {
    const businessesToMap = businesses.map((bus) => {
      return {
        ...bus,
        // reassign value of is_open to current status
        is_open: checkIsOpen(bus.hours),
      };
    });
    return (
      <Container>
        <div className="pt-44 flex">
          <div>
            <h1 className="text-2xl tracking-wide leading-10 ml-6">
              {/* HAVE THIS TAKE {CHILDREN} */}
              Header - move to own component folder - results for {
                header
              } in {currentCity}, {currentState}
            </h1>
            <div className="mx-4">
              {/* <div className=" lg:mx-24 mx-10 pb-12"> */}
              {businessesToMap.map((business, idx) => (
                <div
                  onClick={() =>
                    handleCardClick({
                      businessId: business.id,
                      businessName: business.name,
                    })
                  }
                  key={business.id}
                  // check if at end of currently fetched businesses list to apply lastItemRef for infiniteScroll
                  ref={idx === businessesToMap.length - 1 ? lastItemRef : null}
                >
                  <ListingsCard
                    onClick={handleCardClick}
                    business={business}
                    idx={idx + 1}
                    searchParams={searchParams}
                    onCategoryClick={handleCategoryClick}
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
          {locationCoordinates && (
            <div className="min-w-[500px] max-h-[400px] hidden md:block relative">
              <ListingsMap center={locationCoordinates} />
            </div>
          )}
        </div>
      </Container>
    );
  }
};

export default ListingsPage;
