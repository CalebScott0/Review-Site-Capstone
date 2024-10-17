import { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";

function App() {
  useEffect(() => {
    // ask for user location, returns lat and long if user allows
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        sessionStorage.setItem(
          "userCoordinates",
          JSON.stringify({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          })
        );
      });
    }
    // IF USER GIVES COORDINATES, NAVIGATE TO FIND NEAR ME PAGE!! - you can send data with navigate - read router docs!!
    // first create default business list load with indianapolis - default return from list/all_businesses endpoint
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
