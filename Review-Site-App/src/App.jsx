import Navbar from "./components/navbar/Navbar";

import { Toaster } from "react-hot-toast";

import { Route, Routes } from "react-router-dom";

import ListingsPage from "./pages/ListingsPage";

import HomePage from "./pages/HomePage";

import SingleBusiness from "./pages/SingleBusiness";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* //MAKE ONE /search route with serach parameters like yelp!! */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<ListingsPage />} />
        <Route path="/business/:business_name" element={<SingleBusiness />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
