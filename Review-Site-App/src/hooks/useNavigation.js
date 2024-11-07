import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const handleBusinessClick = ({ businessId, businessName }) => {
    if (!businessId || !businessName) return;
    const joinNameWithDashes = businessName.split(" ").join("-");
    navigate(`/business/${joinNameWithDashes}`, {
      state: { businessId },
    });
  };

  const handleCategoryClick = ({ categoryId, categoryName, city, state }) => {
    if (!categoryId || !categoryName || !city || !state) return;
    navigate(
      // encode to handle & in categories - which intereres with url params
      `/search?find_desc=${encodeURIComponent(categoryName)}&find_loc=${`${city} ${state}`}`,
      {
        state: { categoryId },
      }
    );
  };

  return { handleBusinessClick, handleCategoryClick };
};

export default useNavigation;
