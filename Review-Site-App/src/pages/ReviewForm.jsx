import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetReviewsForBusinessQuery } from "../redux/services/businessesApi";

const ReviewForm = () => {
  // if no user navigate back
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  if (!userId) navigate(-1);

  // grab businessId from location state
  const { state } = useLocation();
  const { businessId } = state;

  // recent reviews to display on side of review form
  const {
    data: businessReviews,
    error,
    isLoading,
  } = useGetReviewsForBusinessQuery({ businessId });

  const reviews = businessReviews?.reviews;

  console.log(reviews);

  return <div>We reviewin</div>;
};

export default ReviewForm;
