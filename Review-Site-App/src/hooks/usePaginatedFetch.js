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
  }, [data, dataLabel, page]);

  const handlePageChange = (newPage) => {
    // if new page is requested and data has a next page
    if (newPage !== page && newPage > 0 && newPage <= data?.pages) {
      setPage(newPage);
    }
  };

  return {
    items,
    error,
    isLoading,
    handlePageChange, //function to change pages
    isFetchingNextPage: isFetching,
    currentPage: page,
    totalPages: data?.pages,
  };
};

export default usePaginatedFetch;
