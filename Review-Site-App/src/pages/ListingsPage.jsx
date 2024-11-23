import Container from '../components/Container';

import PaginationMenu from '../components/PaginationMenu';

import {
  useGetListingsByCategoryQuery,
  useGetListingsByNameQuery,
} from '../redux/services/businessesApi';

import ListingsCard from '../components/cards/ListingsCard';

import ListingsMap from '../components/map/ListingsMap';

import usePaginatedFetch from '../hooks/usePaginatedFetch';

import checkIsOpen from '../utils/CheckIsOpen';

import { DotLoader } from 'react-spinners';

import { toast } from 'react-hot-toast';

import Heading from '../components/Heading';
import { useCallback, useState } from 'react';
import { MdOutlineZoomInMap, MdOutlineZoomOutMap } from 'react-icons/md';

/*
 * TODO:
 *  - Make map transition smoother
 *
 * FIXME:
 */

const ListingsPage = ({
  currentCity,
  currentState,
  categoryId,
  category, // will be either category name or name of business with multiple listings
  handleSingleBusinessClick,
  handleCategoryListingsClick,
}) => {
  const dataLabel = 'businesses';
  const limit = 10;

  const [showFullMap, setShowFullMap] = useState(false);

  const toggleOpen = useCallback(() => {
    setShowFullMap((value) => !value);
  }, []);

  /*  conditional paginated fetch
   *  if categoryId - call listings by category query, otherwise  call listings by business name query
   */
  const query = categoryId
    ? useGetListingsByCategoryQuery
    : useGetListingsByNameQuery;

  const queryArgs = categoryId
    ? {
        categoryId,
        city: currentCity,
        state: currentState,
        limit,
      }
    : {
        businessName: category, //category from async select will still be value of business name
        city: currentCity,
        state: currentState,
        limit,
      };

  const {
    items: businesses,
    error,
    isLoading,
    handlePageChange, //function to change pages
    isFetchingNextPage,
    currentPage,
    totalPages,
    paginationRange,
  } = usePaginatedFetch(query, queryArgs, dataLabel); //pass query type, query args for endpoint and dataLabel of main item (businesses)

  // function to get listings insxdex for business, accounts for current page
  const listingsIndex = (idx, currPage) => {
    return idx + 1 + (currPage - 1) * limit;
  };

  if (error) {
    toast.error('Failed to load listings');
    return (
      <div className='pt-52 text-center text-2xl text-rose-500'>
        Unable to show page, please try again.
      </div>
    );
  }

  if (businesses) {
    // **!!
    // change this to something more efficient!!
    const businessesData = businesses.map((bus) => {
      return {
        ...bus,
        // reassign value of is_open to current status
        is_open: checkIsOpen(bus.hours),
      };
    });
    return (
      <Container>
        {isFetchingNextPage || isLoading ? (
          <div className='my-8 flex justify-center pt-60 lg:pt-48'>
            <DotLoader size={30} color='#cccccc' />
          </div>
        ) : (
          <div>
            <div className='mr-20 flex pb-24 pt-60 lg:pt-48'>
              <div className={`${showFullMap ? 'w-5/12' : ''}`}>
                <Heading
                  center
                  title={`Showing Results for ${category} in \n ${currentCity}, ${currentState}`}
                />
                {/* Showing Results for {category} in {currentCity}, {currentState} */}
                <div className='m-4 border-t'>
                  {businessesData.map((business, idx) => (
                    <div key={business.id}>
                      <div
                        onClick={() =>
                          handleSingleBusinessClick({
                            businessId: business.id,
                            businessName: business.name,
                          })
                        }
                      >
                        {/* Card for each business rendered */}
                        <ListingsCard
                          onClick={handleSingleBusinessClick}
                          business={business}
                          // listingsIndex accounts for current page (adds 10 for each page after 1)
                          listingsIndex={listingsIndex(idx, currentPage)}
                          onCategoryClick={handleCategoryListingsClick}
                          currentCity={currentCity}
                          currentState={currentState}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='mx-10 mt-4 md:mx-6 xl:mx-24'>
                  {/* menu for traversing listings pages */}
                  <PaginationMenu
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    paginationRange={paginationRange}
                    showFullMap={showFullMap}
                    button
                  />
                </div>
              </div>
              {/* interactive map to display current businesses rendered */}
              <div className='relative z-10 -mt-9 w-full'>
                <div
                  className={`fixed right-0 h-[81vh] w-96 ${
                    showFullMap ? 'w-7/12' : ''
                  } `}
                >
                  <ListingsMap
                    businessMarkers={businesses}
                    currentPage={currentPage}
                    limit={limit}
                    showFullMap={showFullMap}
                  />
                </div>
                <div className='fixed right-10 z-20 translate-y-2 bg-white transition-all ease-in-out hover:bg-neutral-100 active:scale-95'>
                  {showFullMap ? (
                    <MdOutlineZoomInMap
                      size={40}
                      onClick={() => toggleOpen()}
                    />
                  ) : (
                    <MdOutlineZoomOutMap
                      size={40}
                      onClick={() => toggleOpen()}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    );
  }
};
// <div className="-mt-10 hidden lg:block relative">
//   {/* interactive map to display current businesses rendered */}
//   <ListingsMap
//     businessMarkers={businesses}
//     currentPage={currentPage}
//     limit={limit}
//   />
// </div>

export default ListingsPage;
