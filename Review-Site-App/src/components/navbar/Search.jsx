import { AiOutlineSearch } from "react-icons/ai";
import useSearchModal from "../../hooks/useSearchModal";
import SearchModal from "../modals/SerachModal";
import { useState } from "react";
import Select from "react-select";

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

  const [searchParameter, setSearchParameter] = useState(null);
  const [locationParameter, setLocationParameter] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "none",
      minWidth: "200px",
      width: "100%", // Allow to fill the parent width
      boxShadow: "none",
      paddingTop: "4px",
      paddingBottom: "4px",
      borderRadius: "0.125rem", //tailwind sm radius
      cursor: "text",
      outline: "none",
      "&:focus": {
        outline: "none",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white", // Customize the background color of the dropdown menu
      // borderRadius: "0.5rem", //tailwind round-lg value
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f5f5f5" : "white", // neutral-100 hex value
      color: "black",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "gray",
      },
    }),
  };

  const noOptionsMessage = () => {
    return <div className="p-3 text-center">No results found</div>;
  };

  return (
    <>
      {/* regular search bar for medium screens and larger */}
      {/* <div className="w-full rounded-lg border shadow-sm transition hover:shadow-md md:ml-10 xl:mr-4 text-nowrap overflow-hidden hidden md:block"> */}
      <div className="hidden relative md:flex font-semibold text-sm border rounded-md hover:shadow-md">
        {/* <div className="flex-1 px-6 text-sm font-semibold text-neutral-500 "> */}
        {/* categores/business drop down */}
        <Select
          options={searchOptions}
          styles={customStyles}
          placeholder="Things to do..."
          onChange={(value) => setSearchParameter(value)}
          // closeMenuOnScroll
          noOptionsMessage={noOptionsMessage}
        />
        <Select
          styles={customStyles}
          options={locationOptions}
          placeholder="Location"
          onChange={(value) => setLocationParameter(value)}
        />
        <button className="flex-1 absolute right-0 p-2 bg-amber-500  border-amber-500 border rounded-md rounded-l-none  shadow-md max-w-[50px] ">
          <AiOutlineSearch size={24} color="white" />
        </button>
      </div>
      {/* </div> */}
      {/* </div> */}
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
