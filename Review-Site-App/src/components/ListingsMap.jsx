import { useRef, useEffect } from "react";

import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

const ListingsMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const API_KEY = "pk.ac3170d97cf356772172e8528a0bdbeb";
  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://tiles.locationiq.com/v3/streets/vector.json?key=${API_KEY}`,
      center: [0, 0],
      zoom: 14,
    });
  }, []);

  return <div ref={mapContainer} className="fixed w-full h-4/6"></div>;
};

export default ListingsMap;
