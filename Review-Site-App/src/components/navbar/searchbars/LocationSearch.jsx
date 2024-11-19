import AsyncSelect from "react-select/async";
import { forwardRef } from "react";
import { toast } from "react-hot-toast";

// forward for parent component to access select element
const LocationSearch = forwardRef(
  (
    { currentLocation, customStyles, noOptionsMessage, setCurrentLocation },
    ref
  ) => {
    const fetchLocationResults = async (searchParameter) => {
      try {
        const res = await fetch(
          `https://api-review-site.onrender.com/api/search/locations?location=${searchParameter}`
        );

        if (res.status !== 200 && res.status !== 400) {
          toast.error("Unable to fetch search results");
        }

        const data = await res.json();

        let locationData = data.locations.map(({ city, state }) => ({
          label: `${city}, ${state}`,
          value: `${city}, ${state}`,
        }));

        // FOR CURRENT LOCATION OF USER IF ADDDED
        // locationData.unshift({
        //   label: "Current Location",
        //   value: "Current Location",
        // });

        return locationData;
      } catch (e) {
        // Handle errors if necessary
      }
    };

    const handleLocationChange = (value) => {
      // Location formatted as value = {value: "City, ST", label: ""}
      const location = value?.value;

      const commaIndex = location.indexOf(",");

      const city = location.slice(0, commaIndex);

      // slice out state from back of location value (2 letter abbreviation)
      const state = location.slice(location.length - 2);

      setCurrentLocation({ city, state });
    };

    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={fetchLocationResults}
        noOptionsMessage={noOptionsMessage}
        onChange={handleLocationChange}
        placeholder="Search by city..."
        ref={ref}
        styles={customStyles}
        value={
          // Show current location in input
          currentLocation.city && {
            label: `${currentLocation.city}, ${currentLocation.state}`,
            value: "",
          }
        }
      />
    );
  }
);

LocationSearch.displayName = "LocationSearch";
export default LocationSearch;
