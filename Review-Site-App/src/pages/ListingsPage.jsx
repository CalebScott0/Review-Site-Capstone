import Container from "../components/Container";

import PaginationMenu from "../components/PaginationMenu";

import { useGetListingsQuery } from "../services/businessesApi";

import ListingsCard from "../components/cards/ListingsCard";

import ListingsMap from "../components/map/ListingsMap";

import usePaginatedFetch from "../hooks/usePaginatedFetch";

import checkIsOpen from "../utils/CheckIsOpen";

import { DotLoader } from "react-spinners";

const ListingsPage = ({
  currentCity,
  currentState,
  categoryId,
  category,
  handleBusinessClick,
  handleCategoryClick,
}) => {
  const dataLabel = "businesses";

  const limit = 10;

  const {
    items: businesses,
    error,
    isLoading,
    handlePageChange, //function to change pages
    isFetchingNextPage,
    currentPage,
    totalPages,
    paginationRange,
  } = usePaginatedFetch(
    useGetListingsQuery,
    {
      categoryId,
      city: currentCity,
      state: currentState,
      limit,
    },
    dataLabel
  );

  // function to get listings insxdex for business, accounts for current page
  const listingsIndex = (idx, currPage) => {
    return idx + 1 + (currPage - 1) * limit;
  };

  if (isLoading)
    return <div className="text-center pt-72 text-2xl">Loading Gang!</div>;

  if (error) {
    console.error("Error fetching listings:", error);

    return <div>Error: {error.message}</div>;
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
        {!isFetchingNextPage && (
          <div>
            <div className="pt-44 flex pb-24">
              <div>
                <h1 className="text-2xl tracking-wide leading-10 ml-6">
                  {/* HAVE THIS TAKE {CHILDREN} */}
                  Header - move to own component folder - results for {
                    category
                  }{" "}
                  in {currentCity}, {currentState}
                </h1>
                <div className="mx-4">
                  {/* <div className=" lg:mx-24 mx-10 pb-12"> */}
                  {businessesData.map((business, idx) => (
                    <div key={business.id}>
                      <div
                        onClick={() =>
                          handleBusinessClick({
                            businessId: business.id,
                            businessName: business.name,
                          })
                        }
                      >
                        <ListingsCard
                          onClick={handleBusinessClick}
                          business={business}
                          // listingsIndex accounts for current page (adds 10 for each page after 1)
                          listingsIndex={listingsIndex(idx, currentPage)}
                          onCategoryClick={handleCategoryClick}
                          currentCity={currentCity}
                          currentState={currentState}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 mx-10 xl:mx-24">
                  <PaginationMenu
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    paginationRange={paginationRange}
                  />
                </div>
              </div>
              <div className="min-w-[320px] -mt-6 hidden md:block relative">
                <ListingsMap
                  businessMarkers={businesses}
                  currentPage={currentPage}
                  limit={limit}
                />
              </div>
            </div>
          </div>
        )}
        {isFetchingNextPage && (
          <div className="py-8 pt-44 flex justify-center">
            <DotLoader size={30} color="#cccccc" />
          </div>
        )}
      </Container>
    );
  }
};

export default ListingsPage;
