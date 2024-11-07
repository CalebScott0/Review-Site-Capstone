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

    // setHasNextPage(true);

    setItems([]);
  }, [queryArgs.categoryId, queryArgs.city, queryArgs.state]);

  useEffect(() => {
    if (data) {
      setItems(data[`${dataLabel}`]);
      // check if current length of fetched data is less than limit passed in query args
      // if (data[`${dataLabel}`]?.length < queryArgs.limit) setHasNextPage(false);
      // else setHasNextPage(true);
    }
  }, [data, dataLabel, queryArgs.limit]);

  const handlePageChange = (newPage) => {
    // if new page is requested and data has a next page
    setPage(newPage);
  };

  return {
    items,
    error,
    isLoading,
    handlePageChange, //function to change pages
    isFetchingNextPage: isFetching,
    currentPage: page,
    totalPages: data?.pages,
    // hasNextPage,
  };
};

export default usePaginatedFetch;
