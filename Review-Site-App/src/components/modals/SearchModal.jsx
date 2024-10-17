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
  // onClose functions from useSearchMsodal hooks toggles isOpen to false
  console.log(selectStyles.control);
  // ADD TRANSITION ANIMATION
  return (
    <Container>
      <div className="fixed flex z-50 inset-0 w-full h-full overflow-auto bg-neutral-800/70">
        <div className="absolute left-2 top-3 z-50">
          <AiOutlineSearch size={24} />
        </div>
        <div className="flex-1 relative">
          <AsyncSelect
            cacheOptions
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
            styles={selectStyles}
          />
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
            styles={selectStyles}
          />
          <div className="cursor-pointer p-2 hover:shadow-md  rounded-full absolute top-2 right-2">
            <AiOutlineClose size={20} onClick={onClose} />
          </div>
        </div>
        {/* <div className={`translate `}>
          <div className="w-full p-5 relative bg-white border">
            <div className="flex items-center justify-between ">
              <div className="flex-1 md:px-6 px-2 text-sm font-semibold text-neutral-500 ">
                Things to do...
              </div>
              <div className="flex-1 border-l px-2 md:px-6 text-sm font-semibold text-neutral-500">
                Search by city...
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="bg-white text-center py-10">See more results</div>
    </Container>
  );
};

export default SearchModal;
