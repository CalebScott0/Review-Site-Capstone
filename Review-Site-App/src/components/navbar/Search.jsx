import { AiOutlineSearch } from "react-icons/ai";
import useSearchModal from "../../hooks/useSearchModal";
import SearchModal from "../modals/SerachModal";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <>
      {/* regular search bar for medium screens and larger */}
      <div className="w-full rounded-lg border shadow-sm transition hover:shadow-md md:ml-10 xl:mr-4 text-nowrap overflow-hidden hidden md:block">
        <div className="flex items-center justify-between ">
          <div className="flex-1 px-6 text-sm font-semibold text-neutral-500 ">
            Things to do...
          </div>
          <div className="flex-1 border-l px-6 text-sm font-semibold text-neutral-500">
            Location Search
          </div>
          <button className="flex-1 bg-amber-500 p-3 border-l-none border-amber-500 border rounded-l-none rounded-lg shadow-md max-w-[50px] ">
            <AiOutlineSearch size={24} color="white" />
          </button>
        </div>
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
