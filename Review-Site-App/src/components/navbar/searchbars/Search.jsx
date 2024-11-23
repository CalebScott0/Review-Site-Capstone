import { AiOutlineSearch } from "react-icons/ai";

import { useRef, useState } from "react";

import {
  customStyles,
  noOptionsMessage,
} from "../../../styles/reactSelectStyles";

import CategoryAndBusinessSearch from "./CategoryAndBusinessSearch";
import LocationSearch from "./LocationSearch";

/*
 * TODO:
 *  - Debounce endpoints to make loading smoother?
 *  - Change input value to category selected from category badge on listings page / single business if added
 */

const Search = ({
  handleCategoryListingsClick,
  handleBusinessListingsClick,
  handleSingleBusinessClick,
}) => {
  const locationRef = useRef(null);
  const searchRef = useRef(null);

  // state to show location search on click of category/business search on smaller screens
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  // input values for server side filter search
  const [searchValue, setSearchValue] = useState("");

  // state for current city and state for navigation
  const [currentLocation, setCurrentLocation] = useState({
    city: "",
    state: "",
  });

  const handleSearchClick = () => {
    // focus on search field if none selected and then location field
    if (!searchValue) {
      // Focus on the search field
      searchRef.current.focus();
      return;
    } else if (!currentLocation.city.length) {
      // Focus on the location field
      locationRef.current.focus();
      return;
    } else {
      setShowLocationSearch(false);
      // conditionals for type of search label clicked on
      /*
       * const handleCategoryListingsClick = ({
       * categoryId,
       * categoryName,
       * city,
       * state,
       * }) => {
       */
      // if type category, state for search value = label: category name, value: category id

      if (searchValue.type === "category") {
        handleCategoryListingsClick({
          categoryId: searchValue.value,
          categoryName: searchValue.label,
          city: currentLocation.city,
          state: currentLocation.state,
        });
      } else if (searchValue.type === "multipleBusinesses") {
        // const handleBusinessListingsClick = ({ businessName, city, state }) => {
        handleBusinessListingsClick({
          businessName: searchValue.label,
          city: currentLocation.city,
          state: currentLocation.state,
        });
      }
    }
  };

  return (
    <>
      <div className="xl:mx-24 mx-12 w-full max-w-[60vw] relative flex md:flex-row flex-col font-semibold text-sm border rounded-md border-r-0 shadow ">
        {/* categories/businesses drop down */}

        {/* USE ASYNC SELECT with api calls */}
        <div
          className="flex-1 relative md:border-none border rounded-sm"
          onClick={() => setShowLocationSearch(true)}
        >
          <CategoryAndBusinessSearch
            customStyles={customStyles}
            handleSingleBusinessClick={handleSingleBusinessClick}
            noOptionsMessage={noOptionsMessage}
            ref={searchRef}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setCurrentLocation={setCurrentLocation}
          />
        </div>
        <div
          className={`flex-1 md:border-none border rounded-sm relative ${showLocationSearch ? "block" : "hidden"} md:block`}
        >
          <LocationSearch
            currentLocation={currentLocation}
            customStyles={customStyles}
            noOptionsMessage={noOptionsMessage}
            setCurrentLocation={setCurrentLocation}
            ref={locationRef}
          />
        </div>
        <button
          onClick={handleSearchClick}
          className=" focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:rounded-md focus:ring-offset-white transition active:scale-95 hover:opacity-80 shadow-sm absolute -right-12 bottom-0 top-0 px-3 bg-amber-500  border-amber-500 border-2 -my-[1px] rounded-r-md max-w-[50px] "
        >
          <AiOutlineSearch size={24} color="white" />
        </button>
      </div>
    </>
  );
};

export default Search;
