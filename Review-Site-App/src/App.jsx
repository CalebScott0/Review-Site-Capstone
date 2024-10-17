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
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
