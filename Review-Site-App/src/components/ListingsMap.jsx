import { useRef, useEffect } from "react";

import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

const ListingsMap = ({ center }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  //   HIDE THIS SOMEWHERE
  const API_KEY = "pk.ac3170d97cf356772172e8528a0bdbeb";

  useEffect(() => {
    if (!center) return;
    // set new center on change to new location
    if (map.current) {
      map.current.setCenter([center.longitude, center.latitude]);
    } else {
      // create a new map - (will be a canvas element in browser)
      map.current = new maplibregl.Map({
        // pass map container ref as container for map
        container: mapContainer.current,
        style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${API_KEY}`,
        // center as longitude, latitude passed from endpoint return for location search
        center: [center?.longitude, center?.latitude],
        zoom: 10, //default zoom value
      });
      map.current.addControl(new maplibregl.NavigationControl());
    }
  }, [center]);

  return <div ref={mapContainer} className="fixed w-4/12 h-4/6"></div>;
};

export default ListingsMap;
