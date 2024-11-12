import AsyncSelect from "react-select/async";

import { useState } from "react";

const LocationSearch = ({
  customStyles,
  noOptionsMessage,
  setLocationValue,
}) => {
  // local state to track input
  const [locationInput, setLocationInput] = useState("");

  //   state to track if a selection has been made
  const [selected, setSelected] = useState(false);

  const fetchLocationResults = async (searchParameter) => {
    // if
    try {
      const res = await fetch(
        // `http://localhost:8080/api/search/locations?location=${searchParameter}`
        `https://api-review-site.onrender.com/api/search/locations?location=${searchParameter}`
      );

      const data = await res.json();

      // USE A SET FOR ONLY UNIQUE VALUES? - and clean up capitalization
      // map returned data to match label value object for react select
      let locationData = data.locations.map(({ city, state }) => ({
        label: `${city}, ${state}`,
        value: `${city}, ${state}`,
      }));

      //   add user location option to first item in dropdown
      locationData.unshift({
        label: "Current Location",
        value: "Current Location",
      });

      return locationData;
    } catch (e) {
      // react select NoOptions message to handle results errors
    }
  };

  //   handle typing input changes
  const handleLocationInput = (value) => {
    setSelected(false);
    setLocationInput(value);
  };

  const handleLocationChange = (value) => {
    // NAVIGATE IF CATEGORY / BUSINESS WITH MULTIPLE OCCURRENCES SELECTED
    setSelected(true);
    setLocationValue(value.value);
  };

  const handleLocationClose = () => {
    if (locationInput && !selected) {
      setLocationInput(locationInput);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      //   // value displayed in input on change
      inputValue={locationInput}
      //   // Function that returns a promise, which is the set of options to be used once the promise resolves.
      loadOptions={fetchLocationResults}
      noOptionsMessage={noOptionsMessage}
      //  set on select - state in Search component
      onChange={handleLocationChange}
      //  set on input change
      onInputChange={handleLocationInput}
      //   Preserve input on close
      onMenuClose={handleLocationClose}
      placeholder="Search by city..."
      styles={customStyles}
    />
  );
};

export default LocationSearch;
