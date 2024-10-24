import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import useSearchModal from "../../hooks/useSearchModal";
import SearchModal from "../modals/SearchModal";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { customStyles, noOptionsMessage } from "../../styles/reactSelectStyles";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  // hook returns: { isOpen, onClose, onOpen }; onClose and onOpen toggle isOpen state between false and true respectively
  const searchModal = useSearchModal();
  // const [searchMenuIsOpen, setSearchMenuIsOpen] = useState(false);

  // input values for server side filter search
  const [searchValue, setSearchValue] = useState("");
  const [locationValue, setLocationValue] = useState("Indianapolis, In");
  // selected values
  // value of search term will be category id
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");
  // selected location will be used on navigate, with location value indianapolis as a default
  const [selectedLocation, setSelectedLocation] = useState("");

  // default value for inputs on load after click on menu
  // const [defaultSearch, setdefaultSearch] = useState([]);
  const [defaultLocations, setdefaultLocations] = useState([]);
  // state to track first time user interacts with location menu to clear default
  const [hasInteractedWithLocation, setHasInteractedWithLocation] =
    useState(false);

  // state to track if menu is open or not for icon
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchSearchResults = async (searchParameter) => {
    // setError(null);
    try {
      const res = await fetch(
        // `http://localhost:8080/api/search/businesses_and_categories?query=${searchParameter}`
        `https://api-review-site.onrender.com/api/search/businesses_and_categories?query=${searchParameter}`
      );
      if (res.status !== 200 && res.status !== 400) {
        toast.error("Unable to fetch search results");
      }
      // error on 404 response, 400 could just mean no search results - which will be handled by
      // no Options Message
      let data = await res.json();
      // CHANGE THIS TO SHOW SOMETHING EXTRA WITH BUSINESSES
      data = [
        ...data.search_results.categories,
        ...data.search_results.businesses,
      ];
      // map returned data to match label value object for react select
      return data.map((item) => ({
        label: item.name,
        value: item.id,
        type: item.type,
      }));
    } catch (e) {
      console.log(e);
      // react select NoOptions message to handle results errors
    }
  };

  const fetchLocationResults = async (searchParameter) => {
    // setError(null);
    try {
      const res = await fetch(
        // `http://localhost:8080/api/search//locations?location=${searchParameter}`
        `https://api-review-site.onrender.com/api/search//locations?location=${searchParameter}`
      );
      const data = await res.json();
      // USE A SET FOR ONLY UNIQUE VALUES? - and clean up capitalization
      // map returned data to match label value object for react select
      return data.locations.map(({ city, state }) => ({
        label: `${city}, ${state}`,
        value: `${city}, ${state}`,
      }));
    } catch (e) {
      console.log(e);
      // react select NoOptions message to handle results errors
    }
  };

  const handleSearchClick = () => {
    if (!selectedSearchTerm) {
      toast.error("Please enter a search term for things to do", {
        duration: 2000,
        className: "mt-16",
      });
      return;
    }
    // use selected location or default of location value as backup
    const location = selectedLocation ? selectedLocation : locationValue;
    // slice out comma before passing to searchParams
    const sliceIndex = location.indexOf(",");
    const city = location.slice(0, sliceIndex).trim();
    const state = location.slice(sliceIndex + 1).trim();

    // if search term is a category - show listings by distance from location
    if (selectedSearchTerm.type === "category") {
      navigate(
        `/search?find_desc=${selectedSearchTerm.label}&find_loc=${city}${" "}${state}`,
        {
          // pass category id in location state
          state: {
            categoryId: selectedSearchTerm.value,
          },
        }
      );
    }
    // if search term is a business - navigate to business page
    else if (selectedSearchTerm.type === "business") {
      console.log("business_id: ", selectedSearchTerm.value);
    }
  };

  // functions to handle input change
  const handleSearchInputChange = (value) => {
    // to avoid clearing input on certain actions
    setSearchValue(value);
  };

  const handleLocationInputChange = (value) => {
    // to avoid clearing input on certain actions
    // once interacted, will not call base render for defaults
    setHasInteractedWithLocation(true);
    setLocationValue(value);
  };

  // functions to handle on selection change
  // THIS WILL TURN INTO A NAVIGATE FUNCTION
  const handleSearchChange = (value) => {
    // setSearchMenuIsOpen(false);
    // clear any input value on select

    setSelectedSearchTerm(value ? value : "");
  };

  const handleLocationChange = async (value) => {
    // if (!selectedSearchTerm) setSearchMenuIsOpen(true);
    // ELSE NAVIGATE

    setSelectedLocation(value ? value.label : "");
    // change default shown after selection
    setdefaultLocations(await fetchLocationResults(value.label));
  };

  const handleLocationMenuOpen = async () => {
    // clear default location on menu open first interaction
    // fetch default top 5 results for location
    if (!hasInteractedWithLocation) {
      setLocationValue("");
      setdefaultLocations(await fetchLocationResults(""));
    }
  };

  // const handleSearchMenuOpen = async () => {
  //   // fetch default top 5 results for categories
  //   // if (!selectedSearchTerm) setdefaultSearch(await fetchSearchResults(""));
  //   // else setdefaultSearch(await fetchSearchResults(selectedSearchTerm));
  // };

  const handleLocationMenuClose = () => {
    if (locationValue && !selectedLocation) {
      setLocationValue(locationValue);
    }
  };

  return (
    <>
      {/* regular search bar for medium screens and larger */}
      <div className="xl:mx-24 mx-12 hidden w-full max-w-[60vw] relative md:flex font-semibold text-sm border rounded-md border-r-0 shadow-md">
        {/* categories/businesses drop down */}

        {/* USE ASYNC SELECT with api calls */}
        <div
          className="flex-1 relative"
          // onClick={() => setSearchMenuIsOpen(!searchMenuIsOpen)}
        >
          <AsyncSelect
            cacheOptions
            defaultOptions
            // value displayed in input on change
            inputValue={searchValue}
            // Function that returns a promise, which is the set of options to be used once the promise resolves.
            loadOptions={fetchSearchResults}
            noOptionsMessage={noOptionsMessage}
            // set on select
            onChange={handleSearchChange}
            // set on input change
            onInputChange={handleSearchInputChange}
            // onMenuOpen={handleSearchMenuOpen}
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
            // closeMenuOnSelect={false}
            defaultOptions={defaultLocations}
            // value displayed in input on change
            inputValue={locationValue}
            // Function that returns a promise, which is the set of options to be used once the promise resolves.
            loadOptions={fetchLocationResults}
            noOptionsMessage={noOptionsMessage}
            // set on select
            onChange={handleLocationChange}
            // set on change
            onInputChange={handleLocationInputChange}
            onMenuClose={handleLocationMenuClose}
            // fetches options on menu open for first render
            onMenuOpen={handleLocationMenuOpen}
            placeholder="Search by city..."
            styles={customStyles}
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
          fetchLocationResults={fetchLocationResults}
          fetchSearchResults={fetchSearchResults}
          selectStyles={customStyles}
          handleSearchInputChange={handleSearchInputChange}
          handleLocationInputChange={handleLocationInputChange}
          // handleSearchMenuClose={handleSearchMenuClose}
          // handleLocationMenuClose={handleLocationMenuClose}
          onClose={searchModal.onClose}
          isOpen={searchModal.isOpen}
          noOptionsMessage={noOptionsMessage}
          searchValue={searchValue}
          locationValue={locationValue}
        />
      )}
    </>
  );
};

export default Search;
