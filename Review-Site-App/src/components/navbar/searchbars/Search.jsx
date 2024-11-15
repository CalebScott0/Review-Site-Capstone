import { AiOutlineSearch } from "react-icons/ai";

import useSearchModal from "../../../hooks/useSearchModal";

import SearchModal from "../../modals/SearchModal";

import { useRef, useState } from "react";

import {
  customStyles,
  noOptionsMessage,
} from "../../../styles/reactSelectStyles";

import CategoryAndBusinessSearch from "./CategoryAndBusinessSearch";
import LocationSearch from "./LocationSearch";

// import { useNavigate } from "react-router-dom";

const Search = ({
  handleCategoryListingsClick,
  handleBusinessListingsClick,
  handleSingleBusinessClick,
}) => {
  // hook returns: { isOpen, onClose, onOpen };
  //  onClose and onOpen toggle isOpen state between false and true respectively
  const searchModal = useSearchModal();

  const locationRef = useRef(null);
  const searchRef = useRef(null);

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
      {/* regular search bar for medium screens and larger */}
      <div className="xl:mx-24 mx-12 w-full max-w-[60vw] flex font-semibold text-sm border rounded-md border-r-0 shadow-md">
        {/* <div className="xl:mx-24 mx-12 hidden w-full max-w-[60vw] relative md:flex font-semibold text-sm border rounded-md border-r-0 shadow-md"> */}
        {/* categories/businesses drop down */}

        {/* USE ASYNC SELECT with api calls */}
        <div className="flex-1 relative">
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
        <div className="flex-1 relative">
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
      {/* Search button onclick shows a search modal */}
      <div className="md:hidden flex w-full place-content-end ">
        <div
          onClick={searchModal.onOpen}
          className="cursor-pointer hover:shadow-md rounded-full p-2"
        >
          <AiOutlineSearch size={24} />
        </div>
      </div>
      {/* full screen search modal for md and smaller screens */}
      {searchModal.isOpen && (
        <SearchModal
        // fetchLocationResults={fetchLocationResults}
        // fetchSearchResults={fetchSearchResults}
        // selectStyles={customStyles}
        // handleSearchInputChange={handleSearchInputChange}
        // handleLocationInputChange={handleLocationInputChange}
        // // handleSearchMenuClose={handleSearchMenuClose}
        // // handleLocationMenuClose={handleLocationMenuClose}
        // onClose={searchModal.onClose}
        // isOpen={searchModal.isOpen}
        // noOptionsMessage={noOptionsMessage}
        // searchValue={searchValue}
        // locationValue={locationValue}
        />
      )}
    </>
  );
};

export default Search;
