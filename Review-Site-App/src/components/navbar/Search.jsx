import { AiOutlineSearch } from "react-icons/ai";
import useSearchModal from "../../hooks/useSearchModal";
import SearchModal from "../modals/SerachModal";
import { useState } from "react";
import Select from "react-select";
import { customStyles, noOptionsMessage } from "../../styles/reactSelectStyles";
import useFetch from "../../hooks/useFetch";

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
  // hook returns [data] from the fetch call pased to it

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useFetch("/category/list/all_categories");
  const {
    data: businesses,
    isLoading: isBusinessesLoading,
    error: businessesError,
  } = useFetch("/business/list/all_businesses");

  // map categories and businesses to match react-select label/value pairing
  const categoriesData = categories?.categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const [searchParameter, setSearchParameter] = useState(null);
  const [locationParameter, setLocationParameter] = useState(null);

  return (
    <>
      {/* regular search bar for medium screens and larger */}
      <div className="hidden relative md:flex font-semibold text-sm border-2 rounded-md border-r-0 hover:shadow-md">
        {/* categories/businesses drop down */}
        <Select
          options={categoriesData}
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
        <button className="flex-1 absolute right-0 bottom-[0.1px] p-2 bg-amber-500  border-amber-500 border rounded-md rounded-l-none  shadow-md max-w-[50px] ">
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
