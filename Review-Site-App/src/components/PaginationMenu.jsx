import Button from "../components/Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationMenu = ({
  currentPage,
  handlePageChange,
  paginationRange,
  totalPages,
}) => {
  return (
    <div className="flex-wrap flex lg:flex-nowrap">
      <div className="join mb-4 lg:mb-0 mr-2">
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          className="join-item self-center cursor-pointer"
        >
          <FiChevronLeft
            className="active:scale-95"
            size={30}
            color="#737373"
          />
        </div>
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
          className="join-item self-center cursor-pointer"
        >
          <FiChevronRight
            className="active:scale-95"
            size={30}
            color="#737373"
          />
        </div>
      </div>
      <div className="w-40 mx-3 sm:mx-6">
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          label="Next Page"
        ></Button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default PaginationMenu;
