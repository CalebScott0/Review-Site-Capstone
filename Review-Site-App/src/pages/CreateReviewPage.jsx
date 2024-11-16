import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetReviewsForBusinessQuery } from "../redux/services/businessesApi";
import { useEffect, useState } from "react";
import ReviewForm from "../forms/ReviewForm";

const CreateReviewPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  // grab businessId from location state
  const { state } = useLocation();
  const { businessId } = state;

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

  console.log(reviews);
  return (
    <ReviewForm
      userId={userId}
      businessId={businessId}
      businessName={businessName}
    />
  );
};

export default CreateReviewPage;
