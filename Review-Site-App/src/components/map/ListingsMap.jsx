import { useEffect, useRef, useState } from "react";

import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

/*
 * TODO:
 *  - Add index number of business to marker
 *  - change "active" marker based on current business in view (look at yelp)
 *  - onClick (so it works with mobile too) - show popup on marker of business info
 *     - onClick of this popup - navigate to business page
 *  - Add option to make map full screen on computers
 *  - Button to show full screen map on smaller screens
 *
 * FIXME:
 *
 */

const ListingsMap = ({ businessMarkers, currentPage, limit }) => {
  // const ListingsMap = ({ center, businessMarkers }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // store markers in state
  const [markers, setMarkers] = useState([]);

  //   HIDE THIS SOMEWHERE
  const API_KEY = "pk.ac3170d97cf356772172e8528a0bdbeb";

  useEffect(() => {
    if (!businessMarkers.length) return;

    // set new center on change to new location
    if (map.current) {
      map.current.setCenter([
        businessMarkers[0]?.longitude,
        businessMarkers[0]?.latitude,
      ]);
      // map.current.setCenter([center?.longitude, center?.latitude]);
    } else {
      // create a new map - (will be a canvas element in browser)
      map.current = new maplibregl.Map({
        // pass map container ref as container for map
        container: mapContainer.current,
        style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${API_KEY}`,
        // center as longitude, latitude passed from endpoint return for location search

        center: [businessMarkers[0]?.longitude, businessMarkers[0]?.latitude],
        // center: [center?.longitude, center?.latitude],
        zoom: 14, //default zoom value
      });
      const navigation = new maplibregl.NavigationControl();
      map.current?.addControl(navigation);
    }
    // Clear old markers
    markers.forEach((marker) => marker.remove());
    setMarkers([]); // Reset markers state

    // Add new markers with numbers and update the markers state
    const newMarkers = businessMarkers.map((business, index) => {
      // Create a custom marker element
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `<span>${index + 1 + (currentPage - 1) * limit}</span>`; // Numbered marker

      // Create the maplibre marker with custom element
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([business.longitude, business.latitude])
        .addTo(map.current);
      return marker;
    });

    setMarkers(newMarkers);
    // Cleanup on component unmount
    return () => {
      newMarkers.forEach((marker) => marker.remove());
    };
  }, [businessMarkers]);

  return (
    <div ref={mapContainer} className="w-[320px] h-[80%] right-2 fixed"></div>
  );
};

export default ListingsMap;
