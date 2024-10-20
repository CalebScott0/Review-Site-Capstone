import Navbar from "./components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
// import ListingsPage from "./pages/ListingsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<ListingsPage />} />{" "} */}
        {/* 👈 Renders at /app/ */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
