import Navbar from "./components/navbar/Navbar";

import { Toaster } from "react-hot-toast";

import { Route, Routes } from "react-router-dom";

import ListingsPage from "./pages/ListingsPage";

import HomePage from "./pages/HomePage";

import SingleBusiness from "./pages/SingleBusiness";

import useSearchState from "./hooks/useSearchState";

import useNavigation from "./hooks/useNavigation";

function App() {
  // hooks for searchState and navigation to a new category or to single business
  const { category, categoryId, currentCity, currentState } = useSearchState();
  const {
    handleSingleBusinessClick,
    handleBusinessListingsClick,
    handleCategoryListingsClick,
  } = useNavigation();

  return (
    <>
      <Navbar
        handleSingleBusinessClick={handleSingleBusinessClick}
        handleCategoryListingsClick={handleCategoryListingsClick}
        handleBusinessListingsClick={handleBusinessListingsClick}
      />
      <Routes>
        {/* //MAKE ONE /search route with serach parameters like yelp!! */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/search"
          element={
            <ListingsPage
              currentCity={currentCity}
              currentState={currentState}
              categoryId={categoryId}
              category={category}
              handleSingleBusinessClick={handleSingleBusinessClick}
              handleCategoryListingsClick={handleCategoryListingsClick}
            />
          }
        />
        <Route path="/business/:business_name" element={<SingleBusiness />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
