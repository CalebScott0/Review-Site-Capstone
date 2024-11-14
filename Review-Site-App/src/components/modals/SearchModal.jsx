import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import Container from "../Container";
import AsyncSelect from "react-select/async";

const SearchModal = ({
  onClose,
  fetchLocationResults,
  fetchSearchResults,
  handleSearchInputChange,
  handleLocationInputChange,
  handleLocationMenuClose,
  handleSearchMenuClose,
  noOptionsMessage,
  selectStyles,
  locationValue,
  searchValue,
}) => {
  return;
  //  (

  // <MODAL></MODAL>
  // CREATE SLICE FOR THIS TOO

  // <div className="fixed flex z-50 inset-0 w-full h-full overflow-auto bg-neutral-800/70">
  //   <div className="absolute left-2 top-3 z-50 hidden sm:block">
  //     <AiOutlineSearch size={24} />
  //   </div>
  //   <div className="flex-1 relative">
  //     <AsyncSelect
  //       cacheOptions
  //       defaultOptions
  //       // value displayed in input on change
  //       inputValue={searchValue}
  //       // Function that returns a promise, which is the set of options to be used once the promise resolves.
  //       loadOptions={fetchSearchResults}
  //       noOptionsMessage={noOptionsMessage}
  //       onInputChange={handleSearchInputChange}
  //       onMenuClose={handleSearchMenuClose}
  //       placeholder="Things to do..."
  //       styles={selectStyles}
  //     />
  //   </div>
  //   <div className="flex-1 relative">
  //     <AsyncSelect
  //       cacheOptions
  //       defaultOptions
  //       // value displayed in input on change
  //       inputValue={locationValue}
  //       // Function that returns a promise, which is the set of options to be used once the promise resolves.
  //       loadOptions={fetchLocationResults}
  //       noOptionsMessage={noOptionsMessage}
  //       onInputChange={handleLocationInputChange}
  //       onMenuClose={handleLocationMenuClose}
  //       placeholder="Search by city..."
  //       styles={selectStyles}
  //     />
  //     <div className="cursor-pointer p-2 hover:shadow-md  rounded-full absolute top-2 right-2">
  //       <AiOutlineClose size={20} onClick={onClose} />
  //     </div>
  //   </div>
  // </div>
  // );
};

export default SearchModal;
