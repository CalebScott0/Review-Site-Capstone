import Button from '../components/Button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const PaginationMenu = ({
  currentPage,
  handlePageChange,
  paginationRange,
  totalPages,
  button,
  showFullMap,
}) => {
  return (
    <div className='flex flex-wrap lg:flex-nowrap'>
      <div className='join mb-4 mr-2 lg:mb-0'>
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          className='join-item cursor-pointer self-center'
        >
          <FiChevronLeft
            className='active:scale-95'
            size={30}
            color='#737373'
          />
        </div>
        {paginationRange.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(val)}
            className={`btn btn-outline join-item border-neutral-200 hover:border-neutral-200 hover:bg-amber-500 ${val === currentPage ? `border-amber-500 bg-amber-500 text-white` : ''}`}
          >
            {val}
          </button>
        ))}
        <div
          onClick={() => handlePageChange(currentPage + 1)}
          className='join-item cursor-pointer self-center'
        >
          <FiChevronRight
            className='active:scale-95'
            size={30}
            color='#737373'
          />
        </div>
      </div>
      <div className='hidden w-40 md:block'>
        {button && !showFullMap && (
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            label='Next Page'
          ></Button>
        )}
      </div>
    </div>
  );
};

export default PaginationMenu;
