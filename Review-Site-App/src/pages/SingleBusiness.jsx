import { useLocation } from "react-router-dom";
import { useGetSingleBusinessQuery } from "../redux/services/businessesApi";
import ReactStars from "react-stars";
import SingleBusinessCarousel from "../components/carousels/SingleBusinessCarousel";
import ReviewList from "../components/ReviewList";
import Button from "../components/Button";
import { DotLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { onLoginOpen } from "./../redux/slices/loginModalSlice";
import { useEffect, useState } from "react";

const SingleBusiness = ({ handleReviewNavigateClick }) => {
  const { state } = useLocation();

  // grab businessId from location state
  const { businessId } = state;

  const dispatch = useDispatch();

  // check if userId
  const userId = useSelector((state) => state.auth.userId);

  // State to store pending review navigation
  const [pendingReview, setPendingReview] = useState(false);

  const {
    data: singleBusiness,
    error,
    isLoading,
  } = useGetSingleBusinessQuery({ businessId });

  // redirect after login if user clicked write a review before authentication
  useEffect(() => {
    if (userId && pendingReview) {
      setTimeout(() => {
        handleReviewNavigateClick({
          businessName: singleBusiness?.business.name,
          businessId: singleBusiness?.business.id,
        });
        setPendingReview(false);
      }, 300);
    }
  }, [handleReviewNavigateClick, userId, pendingReview, singleBusiness]);

  if (error) {
    toast.error("Failed to load business.");

    return (
      <div className="text-rose-500 text-center text-2xl mt-10">
        Unable to show business, please try again.
      </div>
    );
  }

  const handleReviewButtonClick = () => {
    if (!userId) {
      // if no user Id redirect to login
      dispatch(onLoginOpen());
      setPendingReview(true);
    } else {
      handleReviewNavigateClick({
        businessName: singleBusiness?.business.name,
        businessId: singleBusiness?.business.id,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="my-8 flex justify-center">
        <DotLoader size={30} color="#cccccc" />
      </div>
    );
  }
  const business = singleBusiness?.business;

  if (business) {
    return (
      <div className="pb-24">
        {/* Business page Header */}
        <div className="relative">
          {/* carousel of images displayed on top of business page */}
          <SingleBusinessCarousel businessId={business.id} />
          <div className="text-shadow absolute bottom-10 lg:bottom-16 left-12 md:left-20 lg:left-32">
            <div>
              <span className="md:text-5xl text-4xl font-bold font-[poppins]">
                {business.name}
              </span>
            </div>
            <div className="-mt-2 md:flex items-center gap-2">
              {/* Average Stars and review count */}
              <div className="flex items-center gap-2">
                <ReactStars
                  count={5}
                  edit={false}
                  value={business.average_stars}
                  color2="#ff007f"
                  size={40}
                  // char={<FaRegStar />}
                  half={true}
                />
                {/* render average stars inline to rating stars on smaller screens */}
                <span className="text-lg  font-semibold md:hidden inline">
                  {business.average_stars}
                </span>
              </div>
              <div className=" text-lg text-white font-semibold">
                {/* render average stars normally */}
                <span className="hidden md:inline">
                  {business.average_stars}
                </span>
                <span className="ml-1">({business.review_count}) reviews</span>
              </div>
            </div>
            <div className="max-w-44 mt-2">
              <Button
                onClick={() => handleReviewButtonClick()}
                label="Write a review"
              ></Button>
            </div>
          </div>
        </div>
        {/* review list for business */}
        <ReviewList businessId={business.id} />
      </div>
    );
  }
};

export default SingleBusiness;
