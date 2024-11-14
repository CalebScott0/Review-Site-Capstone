import Navbar from "./components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import HomePage from "./pages/HomePage";
import SingleBusiness from "./pages/SingleBusiness";
import useSearchState from "./hooks/useSearchState";
import useNavigation from "./hooks/useNavigation";
import ReviewForm from "./pages/ReviewForm";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";

function App() {
  // hooks for searchState and navigation to a new category or to single business
  const { category, categoryId, currentCity, currentState } = useSearchState();
  const {
    handleSingleBusinessClick,
    handleBusinessListingsClick,
    handleCategoryListingsClick,
    handleReviewNavigateClick,
  } = useNavigation();

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <Navbar
        handleBusinessListingsClick={handleBusinessListingsClick}
        handleCategoryListingsClick={handleCategoryListingsClick}
        handleSingleBusinessClick={handleSingleBusinessClick}
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
        <Route
          path="/business/:business_name"
          element={
            <SingleBusiness
              handleReviewNavigateClick={handleReviewNavigateClick}
            />
          }
        />
        <Route path="/write-a-review/:business_name" element={<ReviewForm />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
