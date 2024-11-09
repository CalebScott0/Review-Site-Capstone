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

  const handleListingsClick = ({
    categoryId,
    categoryName,
    businessName,
    city,
    state,
    type,
  }) => {
    if (!categoryId || !categoryName || !city || !state) return;
    if (type === "category") {
      navigate(
        // encode to handle & in categories - which intereres with url params
        `/search?find_desc=${encodeURIComponent(categoryName)}&find_loc=${`${city} ${state}`}`,
        {
          state: { categoryId },
        }
      );
    } else if (type === "multipleBusinesses") {
      navigate(
        `/search?find_desc=${encodeURIComponent(businessName)}&find_loc=${`${city} ${state}`}`
      );
    }
  };

  return { handleBusinessClick, handleListingsClick };
};

export default useNavigation;
