import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <>
      <div className="flex shadow-md w-full lg:w-2/4 md:ml-4 mx-auto rounded-lg border border-r-0 py-3 rounded-r-none">
        <div className="ml-4 flex-auto">Things to do...</div>
        <div className="flex-shrink h-4 self-center w-[1.5px] bg-neutral-500 opacity-50"></div>
        <div className="ml-4 flex-auto">Location Search</div>
      </div>
      <button className="bg-amber-500 p-[13px] rounded-l-none rounded-lg shadow-md">
        <AiOutlineSearch size={24} color="white" />
      </button>
    </>
  );
};

export default Search;
