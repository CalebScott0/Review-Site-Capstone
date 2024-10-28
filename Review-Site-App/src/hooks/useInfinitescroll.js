import { useState, useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (
  query,
  queryArgs = {},
  dataLabel /* data label for type of data from fetch i.e data['businesses'] */
) => {
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [items, setItems] = useState([]);

  const observer = useRef();

  //   fetch from rtk query using passed in query
  const { data, error, isLoading, isFetching } = query({
    // give passed in args for query and curr page
    ...queryArgs,
    page,
  });

  // clear list on new search
  useEffect(() => {
    setPage(0);
    setHasNextPage(true);
    setItems([]);
  }, [queryArgs.categoryId, queryArgs.city, queryArgs.state]);

  useEffect(() => {
    if (data) {
      setItems((prevItems) => [...prevItems, ...data[`${dataLabel}`]]);
      // setHasNextPage(data[`${dataLabel}`]?.length < queryArgs.limit);
      // check if current length of fetched data is less than limit passed in query args
      if (data[`${dataLabel}`]?.length < queryArgs.limit) setHasNextPage(false);
    }
  }, [data, dataLabel, queryArgs.limit]);

  //   create last Item ref
  const lastItemRef = useCallback(
    (node) => {
      if (isFetching || !hasNextPage) return;

      if (observer.current) observer.current.disconnect();
      // create new intersection observer and check if last item visible
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextPage]
  );

  return {
    items,
    error,
    isLoading,
    lastItemRef,
    isFetchingNextPage: isFetching,
  };
};

export default useInfiniteScroll;
