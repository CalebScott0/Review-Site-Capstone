import { useState, useEffect } from "react";

const usePaginatedFetch = (
  query,
  queryArgs = {},
  dataLabel /* data label for type of data from fetch i.e data['businesses'] */
) => {
  const [page, setPage] = useState(1);

  // const [hasNextPage, setHasNextPage] = useState(true);

  const [items, setItems] = useState([]);

  //   fetch from rtk query using passed in hook
  const { data, error, isLoading, isFetching } = query({
    // give passed in args for query and add curr page
    ...queryArgs,
    page,
  });

  // clear list on new search - query args will change
  useEffect(() => {
    // reset to page 1
    setPage(1);

    setItems([]);
  }, [queryArgs.categoryId, queryArgs.city, queryArgs.state]);

  useEffect(() => {
    if (data) {
      // set items with passed in data label
      setItems(data[`${dataLabel}`]);

      // Sync hook page state with backend response in case they differ
      if (data.page !== page) {
        setPage(data.page);
      }
    }
    // no page dependency - interfering with click on pagination menu
    // page update caused timing mismatch with async loading of data
  }, [data, dataLabel]);

  const handlePageChange = (newPage) => {
    // if new page is requested and data has a next page
    if (newPage !== page && newPage > 0 && newPage <= data?.pages) {
      setPage(newPage);
    }
  };

  // Pagination range logic
  const getPaginationRange = () => {
    const maxVisiblePages = 9;
    const totalPages = data?.pages ?? 0;

    // If total pages are fewer than max visible pages, show all
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate range for current page
    let startPage;
    // let endPage;

    if (page < 6) {
      startPage = 1;
      // endPage = maxVisiblePages;
    } else if (page + 4 >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      // endPage = totalPages;
    } else {
      startPage = page - 4;
      // endPage = page + 4;
    }

    return Array.from({ length: maxVisiblePages }, (_, idx) => startPage + idx);
  };

  return {
    items,
    error,
    isLoading,
    handlePageChange, //function to change pages
    isFetchingNextPage: isFetching,
    currentPage: page,
    totalPages: data?.pages,
    paginationRange: getPaginationRange(),
  };
};

export default usePaginatedFetch;
