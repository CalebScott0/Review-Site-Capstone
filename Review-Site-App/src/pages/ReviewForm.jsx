import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetReviewsForBusinessQuery } from "../redux/services/businessesApi";
import { useEffect, useState } from "react";

const ReviewForm = () => {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const { business_name } = useParams();

  // if no user navigate back
  useEffect(() => {
    if (!userId) navigate(-1);
  }, [userId]);

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

  return <form></form>;
};

export default ReviewForm;
