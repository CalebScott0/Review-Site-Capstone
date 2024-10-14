import { AiOutlineSearch } from "react-icons/ai";
import { useCallback, useState } from "react";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  // callback function to toggle open - will not change as no dependency array
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <>
      {/* regular search bar for medium screens and larger */}
      <div className="w-full rounded-lg border shadow-sm transition hover:shadow-md md:ml-10 xl:mr-4 text-nowrap overflow-hidden hidden md:block">
        <div className="flex items-center justify-between ">
          <div className="flex-1 md:px-6 px-2 text-sm font-semibold text-neutral-500 ">
            Things to do...
          </div>
          <div className="flex-1 border-l px-2 md:px-6 text-sm font-semibold text-neutral-500">
            Location Search
          </div>
          <button className="flex-1s bg-amber-500 md:p-3 py-3 px-2 border-l-none border-amber-500 border rounded-l-none rounded-lg shadow-md max-w-10  md:max-w-[50px] ">
            <AiOutlineSearch size={24} color="white" />
          </button>
        </div>
      </div>
      {/* Search button onclick shows a search modal */}
      <div className="md:hidden flex w-full place-content-end ">
        <div
          onClick={toggleOpen}
          className="cursor-pointer hover:shadow-md rounded-full p-2"
        >
          <AiOutlineSearch size={24} />
        </div>
      </div>
    </>
  );
};

export default Search;
