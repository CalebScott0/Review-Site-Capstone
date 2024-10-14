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

const Search = () => {
  // hook returns: { isOpen, onClose, onOpen }; onClose and onOpen toggle isOpen state between false and true respectively
  const searchModal = useSearchModal();

  const [searchOption, setSearchOption] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "1px solid lightgray",
      boxShadow: "none",
      borderRadius: "0.5rem", //tailwind round-lg value
      cursor: "text",
      "&:hover": {
        borderColor: "gray",
        boxShadow:
          // tailwind shadow-md
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white", // Customize the background color of the dropdown menu
      borderRadius: "0.5rem", //tailwind round-lg value
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f5f5f5" : "white", // Customize hover state
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
      <div className="font-semibold text-sm">
        {/* <div className="flex-1 px-6 text-sm font-semibold text-neutral-500 "> */}
        {/* categores/business drop down */}
        <Select
          options={searchOptions}
          styles={customStyles}
          value={searchOption}
          placeholder="Things to do..."
          onChange={(value) => setSearchOption(value)}
          // closeMenuOnScroll
          noOptionsMessage={noOptionsMessage}
        />
      </div>
      {/* <button className="flex-1 bg-amber-500 p-3 border-l-none border-amber-500 border rounded-l-none rounded-lg shadow-md max-w-[50px] ">
            <AiOutlineSearch size={24} color="white" />
          </button> */}
      {/* </div> */}
      {/* </div> */}
      {/* Search button onclick shows a search modal */}
      {/* <div className="md:hidden flex w-full place-content-end ">
        <div
          onClick={searchModal.onOpen}
          className="cursor-pointer hover:shadow-md rounded-full p-2"
        >
          <AiOutlineSearch size={24} />
        </div> */}
      {/* </div> */}
      {/* full screen search modal for md and smaller screens */}
      {/* {searchModal.isOpen && (
        <SearchModal
          onClose={searchModal.onClose}
          isOpen={searchModal.isOpen}
        />
      )} */}
    </>
  );
};

export default Search;
