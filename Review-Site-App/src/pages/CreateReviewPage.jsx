import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetReviewsForBusinessQuery } from "../redux/services/businessesApi";
import { useEffect } from "react";
import ReviewForm from "../forms/ReviewForm";
import RecentReviewList from "../components/businessReviews/RecentReviewList";

const CreateReviewPage = ({ handleSingleBusinessClick }) => {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  // grab businessId from location state
  const businessId = useParams().business_id;

  // business name from url params
  const businessName = useParams().business_name;

  // if no user navigate back
  useEffect(() => {
    if (!userId) navigate(-1);
  }, [userId, navigate]);

  // recent reviews to display on side of review form
  const {
    data: businessReviews,
    error,
    isLoading,
  } = useGetReviewsForBusinessQuery({ businessId });

  const reviews = businessReviews?.reviews;

  const reviewDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!isLoading) {
    return (
      <div className="relative flex">
        <div className="w-2/3 lg:w-5/12 mx-auto mt-10">
          {/* Review form */}
          <ReviewForm
            handleSingleBusinessClick={handleSingleBusinessClick}
            userId={userId}
            businessId={businessId}
            businessName={businessName}
          />
        </div>
        {/* Side bar of most recent reviews */}
        {/* ANIMATE CLOSE AND OPEN!!! */}
        {/* MOVE INTO OWN COMPONENT WHEN DONE */}
        <RecentReviewList
          // businessId={businessId}
          reviews={reviews}
          reviewDate={reviewDate}
          error={error}
        />
      </div>
    );
  }
};

export default CreateReviewPage;
