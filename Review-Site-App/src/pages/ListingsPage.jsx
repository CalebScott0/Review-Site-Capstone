import Container from "../components/Container";

import PaginationMenu from "../components/PaginationMenu";

import {
  useGetListingsByCategoryQuery,
  useGetListingsByNameQuery,
} from "../redux/services/businessesApi";

import ListingsCard from "../components/cards/ListingsCard";

import ListingsMap from "../components/map/ListingsMap";

import usePaginatedFetch from "../hooks/usePaginatedFetch";

import checkIsOpen from "../utils/CheckIsOpen";

import { DotLoader } from "react-spinners";

import { toast } from "react-hot-toast";

import Heading from "../components/Heading";

const ListingsPage = ({
  currentCity,
  currentState,
  categoryId,
  category, // will be either category name or name of business with multiple listings
  handleSingleBusinessClick,
  handleCategoryListingsClick,
}) => {
  const dataLabel = "businesses";
  const limit = 10;

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
    console.error("Error fetching listings:", error);
    toast.error("Failed to load listings");
    return (
      <div className="pt-52 text-rose-500 text-center text-2xl">
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
          <div className="my-8 pt-60 lg:pt-48 flex justify-center">
            <DotLoader size={30} color="#cccccc" />
          </div>
        ) : (
          <div>
            <div className="pt-60 lg:pt-48 flex pb-24">
              <div>
                <Heading
                  center
                  title={`Showing Results for ${category} in ${currentCity}, ${currentState}`}
                />
                {/* Showing Results for {category} in {currentCity}, {currentState} */}
                <div className="mx-4">
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
                <div className="mt-4 mx-10 md:mx-6 xl:mx-24">
                  {/* menu for traversing listings pages */}
                  <PaginationMenu
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    paginationRange={paginationRange}
                    button
                  />
                </div>
              </div>
              <div className="min-w-[320px] -mt-20 hidden lg:block relative">
                {/* interactive map to display current businesses rendered */}
                <ListingsMap
                  businessMarkers={businesses}
                  currentPage={currentPage}
                  limit={limit}
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    );
  }
};

export default ListingsPage;
