import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

const SearchModal = ({ onClose }) => {
  return (
    <div className="fixed z-50 inset-0 w-full h-full overflow-auto bg-neutral-800/70">
      <div className={`translate `}>
        <div className="w-full p-5 relative bg-white border">
          <div className="flex items-center justify-between ">
            <AiOutlineSearch size={24} />
            <div className="flex-1 md:px-6 px-2 text-sm font-semibold text-neutral-500 ">
              Things to do...
            </div>
            <div className="flex-1 border-l px-2 md:px-6 text-sm font-semibold text-neutral-500">
              Location Search
            </div>
            <AiOutlineClose
              className="cursor-pointer rounded-full hover:scale-105"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
