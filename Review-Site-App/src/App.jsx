import Navbar from './components/navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import ListingsPage from './pages/ListingsPage';
import HomePage from './pages/HomePage';
import SingleBusinessPage from './pages/SingleBusinessPage';
import useSearchState from './hooks/useSearchState';
import useNavigation from './hooks/useNavigation';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import CreateReviewPage from './pages/CreateReviewPage';

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
        {/* //MAKE ONE /search route with search parameters like yelp!! */}
        <Route path='/' element={<HomePage />} />
        <Route
          path='/search'
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
          path='/business/:business_name/:business_id'
          element={
            <SingleBusinessPage
              handleReviewNavigateClick={handleReviewNavigateClick}
            />
          }
        />
        <Route
          path='/write-a-review/:business_name/:business_id'
          element={
            <CreateReviewPage
              handleSingleBusinessClick={handleSingleBusinessClick}
            />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
