import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import useSearchModal from "../../hooks/useSearchModal";
import SearchModal from "../modals/SerachModal";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { customStyles, noOptionsMessage } from "../../styles/reactSelectStyles";

const searchOptions = [
  { value: "restaurants", label: "Restaurants" },
  { value: "coffee", label: "Coffee" },
  { value: "bars", label: "Bars" },
  { value: "hotels", label: "Hotels" },
  { value: "parks", label: "Parks" },
  { value: "starbucks", label: "Starbucks" },
  { value: "joes-pizza", label: "Joe's Pizza" },
  { value: "hilton-hotel", label: "Hilton Hotel" },
  { value: "central-park", label: "Central Park" },
];

const locationOptions = [
  { label: "New York", value: "new-york" },
  { label: "San Francisco", value: "san-francisco" },
  { label: "Los Angeles", value: "los-angeles" },
  { label: "Chicago", value: "chicago" },
  { label: "Houston", value: "houston" },
];

const Search = () => {
  // hook returns: { isOpen, onClose, onOpen }; onClose and onOpen toggle isOpen state between false and true respectively
  const searchModal = useSearchModal();

  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [locationValue, setLocationValue] = useState("");

  // state to track if menu is open or not for icon
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchSearchResults = async (searchParameter) => {
    setError(null);
    try {
      const res = await fetch(
        `https://api-review-site.onrender.com/api/search?query=${searchParameter}`
      );
      let data = await res.json();
      data = [
        ...data.search_results.categories,
        ...data.search_results.businesses,
      ];
      // map returned data to match label value object for react select
      return data.search_results.map((x) => ({
        label: x.name,
        value: x.id,
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchLocationResults = async (searchParameter) => {
    setError(null);
    try {
      const res = await fetch(
        `https://api-review-site.onrender.com/api//business/list/locations?query=${searchParameter}`
      );
      const data = await res.json();
      // map returned data to match label value object for react select
      return data.locations.map(({ city, state }) => ({
        label: `${city}, ${state}`,
        value: `${city}, ${state}`,
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchInputChange = (value) => {
    // to avoid clearing input on certain actions
    setSearchValue(value);
  };

  const handleLocationInputChange = (value) => {
    // to avoid clearing input on certain actions
    setLocationValue(value);
  };

  // // this will change to a navigate
  // const handleSearchChange = (value) => {
  //   setInputValue(value);
  // };

  // const handleMenuOpen = () => {
  //   setIsMenuOpen(true);
  // };

  const handleSearchMenuClose = () => {
    setSearchValue(searchValue);
    // setIsMenuOpen(false);
  };

  const handleLocationMenuClose = () => {
    setLocationValue(searchValue);
    // setIsMnuOpen(false);
  };

  // const clearSearchInput = () => {
  //   console.log(selectRef);
  // };

  return (
    <>
      {/* regular search bar for medium screens and larger */}
      <div className="ml-12 mr-6 hidden w-full max-w-[60vw] relative md:flex font-semibold text-sm border rounded-md border-r-0 hover:shadow-md">
        {/* categories/businesses drop down */}

        {/* USE ASYNC SELECT with api calls */}
        <div className="flex-1 relative">
          <AsyncSelect
            cacheOptions
            // ADD DEFAULT OPTIONS
            defaultOptions
            // value displayed in input on change
            inputValue={searchValue}
            // Function that returns a promise, which is the set of options to be used once the promise resolves.
            loadOptions={fetchSearchResults}
            // menuIsOpen={isMenuOpen}
            noOptionsMessage={noOptionsMessage}
            onInputChange={handleSearchInputChange}
            onMenuClose={handleSearchMenuClose}
            // onMenuOpen={handleMenuOpen}
            placeholder="Things to do..."
            styles={customStyles}
          />
          {/* {isMenuOpen && (
            <div
              onClick={clearSearchInput}
              className="absolute z-10 p-1.5 bottom-1.5 right-2 cursor-pointer rounded-lg hover:bg-neutral-200"
            >
              <AiOutlineClose size={18} />
            </div>
          )} */}
        </div>
        <div className="flex-1 relative">
          <AsyncSelect
            cacheOptions
            // ADD DEFAULT OPTIONS
            defaultOptions
            // value displayed in input on change
            inputValue={locationValue}
            // Function that returns a promise, which is the set of options to be used once the promise resolves.
            loadOptions={fetchLocationResults}
            noOptionsMessage={noOptionsMessage}
            onInputChange={handleLocationInputChange}
            onMenuClose={handleLocationMenuClose}
            placeholder="Search by city..."
            styles={customStyles}
          />
        </div>
        <button className="flex-1 absolute right-0 bottom-0 top-0 p-2 bg-amber-500  border-amber-500 border-2 rounded-md rounded-l-none max-w-[50px] ">
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
          onClose={searchModal.onClose}
          isOpen={searchModal.isOpen}
        />
      )}
    </>
  );
};

export default Search;
