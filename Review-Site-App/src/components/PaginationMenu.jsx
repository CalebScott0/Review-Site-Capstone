import Button from "../components/Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationMenu = ({
  currentPage,
  handlePageChange,
  paginationRange,
  totalPages,
}) => {
  console.log(totalPages);
  return (
    <div className="flex-wrap flex lg:flex-nowrap">
      <div
        onClick={() => handlePageChange(currentPage - 1)}
        className="hidden lg:block self-center mb-[13px] lg:mb-0 cursor-pointer"
      >
        <FiChevronLeft className="active:scale-95" size={30} color="#737373" />
      </div>
      <div className="join mb-4 lg:mb-0 mr-2">
        {paginationRange.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(val)}
            className={`join-item hover:bg-amber-500 hover:border-neutral-200 btn border-neutral-200 btn-outline ${val === currentPage ? `bg-amber-500 text-white border-amber-500` : ""}`}
          >
            {val}
          </button>
        ))}
        <div
          onClick={() => handlePageChange(currentPage + 1)}
          className="hidden lg:block self-center cursor-pointer"
        >
          <FiChevronRight
            className="active:scale-95"
            size={30}
            color="#737373"
          />
        </div>
      </div>
      <div className=" flex">
        <div className="lg:hidden">
          <Button
            outline
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            label="Previous Page"
          ></Button>
        </div>
        <div className="w-40 mx-6">
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            label="Next Page"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationMenu;
