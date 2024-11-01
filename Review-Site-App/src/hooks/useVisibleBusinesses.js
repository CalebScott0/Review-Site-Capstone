import { useState, useEffect, useRef, useCallback } from "react";

const useVisibleBusinesses = (businesses) => {
  // state to hold which businesses are currently visible
  const [visibleBusinesses, setVisibleBusinesses] = useState([]);

  const businessRefs = useRef({});
  const handleIntersection = useCallback(
    (entries) => {
      // Create a Set for the current visible businesses
      const currentVisible = new Set(visibleBusinesses);

      // // Loop through each entry to check if it's intersecting
      entries.forEach((entry) => {
        const business = {
          id: entry.target.dataset.businessId,
          longitude: entry.target.dataset.businessLon,
          latitude: entry.target.dataset.businessLat,
        };

        if (entry.isIntersecting) {
          // Add the business to the set if it's in view
          currentVisible.add(business);
        } else {
          // Remove the business if it's not in view
          currentVisible.delete(business);
          console.log(currentVisible.size);
        }
      });

      setVisibleBusinesses(Array.from(currentVisible));

      // check which entries are intersecting
      // const businessesInView = entries
      //   .filter((entry) => entry.isIntersecting)
      //   // grab all businessIds from the data id for current intersection entries
      //   .map((entry) => {
      //     return {
      //       id: entry.target.dataset.businessId,
      //       longitude: entry.target.dataset.businessLon,
      //       latitude: entry.target.dataset.businessLat,
      //     };
      //   });
      // // append new visible businesses to state
      // setVisibleBusinesses((prev) => {
      //   const newVisible = new Set([...prev, ...businessesInView]);

      //   return Array.from(newVisible);
      // });
    },
    [visibleBusinesses]
  );

  useEffect(() => {
    // clear businessList if businesses changes - otherwise list will constantly grow on new listings
    setVisibleBusinesses([]);

    const io = new IntersectionObserver(handleIntersection, {
      root: null, //If the root is null, then the bounds of the actual document viewport are used.
      rootMargin: "0px",
      threshold: 0.1, //the observer will trigger when 10% or more of the element is in view
    });
    // observe each business element
    businesses.forEach((el) => {
      const ref = businessRefs.current[el.id];
      ref && io.observe(ref);

      //   disconect observer on dismount
      return () => io.disconnect();
    });
  }, [businesses]);
  console.log(visibleBusinesses);
  return { visibleBusinesses, businessRefs };
};

export default useVisibleBusinesses;
