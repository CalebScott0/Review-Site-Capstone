import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const handleSingleBusinessClick = ({ businessId, businessName }) => {
    if (!businessId || !businessName) return;
    const joinNameWithDashes = businessName.split(' ').join('-');
    navigate(`/business/${joinNameWithDashes}/${businessId}`);
  };

  const handleCategoryListingsClick = ({
    categoryId,
    categoryName,
    city,
    state,
  }) => {
    if (!categoryId || !categoryName || !city || !state) return;

    navigate(
      // encode to handle & in categories - which intereres with url params
      `/search?find_desc=${encodeURIComponent(categoryName)}&find_loc=${`${city} ${state}&with_id=${categoryId}`}`
    );
  };

  const handleBusinessListingsClick = ({ businessName, city, state }) => {
    // ERROR MESSAGE FOR NO LOCATION
    if (!businessName || !city || !state) return;
    navigate(
      // encode to handle & in categories - which intereres with url params
      `/search?find_desc=${encodeURIComponent(businessName)}&find_loc=${`${city} ${state}`}`
    );
  };

  const handleReviewNavigateClick = ({ businessName, businessId }) => {
    navigate(
      `/write-a-review/${encodeURIComponent(businessName)}/${businessId}`
    );
  };

  return {
    handleSingleBusinessClick,
    handleBusinessListingsClick,
    handleCategoryListingsClick,
    handleReviewNavigateClick,
  };
};

export default useNavigation;
