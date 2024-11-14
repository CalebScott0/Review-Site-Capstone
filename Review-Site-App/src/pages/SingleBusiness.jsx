import { useLocation } from "react-router-dom";
import { useGetSingleBusinessQuery } from "../services/businessesApi";
import ReactStars from "react-stars";
import SingleBusinessCarousel from "../components/carousels/SingleBusinessCarousel";
import ReviewList from "../components/ReviewList";
import Button from "../components/Button";
import { DotLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const SingleBusiness = ({ handleReviewNavigateClick }) => {
  const { state } = useLocation();
  // grab businessId from location state
  const { businessId } = state;

  const {
    data: singleBusiness,
    error,
    isLoading,
  } = useGetSingleBusinessQuery({ businessId });

  if (error) {
    toast.error("Failed to load business.");

    return (
      <div className="text-red-500 text-center text-2xl mt-10">
        Unable to show business, please try again.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="my-8 flex justify-center">
        <DotLoader size={30} color="#cccccc" />
      </div>
    );
  }

  if (singleBusiness?.business) {
    return (
      <div className="pb-24">
        {/* Business page Header */}
        <div className="relative">
          {/* carousel of images displayed on top of business page */}
          <SingleBusinessCarousel businessId={singleBusiness.business.id} />
          <div className="text-shadow absolute bottom-[25%] left-[10%]">
            <div>
              <span className="text-5xl font-bold font-[poppins]">
                {singleBusiness.business?.name}
              </span>
            </div>
            <div className="-mt-2 flex items-center gap-2">
              {/* Average Stars and review count */}
              <ReactStars
                count={5}
                edit={false}
                value={singleBusiness.business.average_stars}
                color2="#ff007f"
                size={40}
                // char={<FaRegStar />}
                half={true}
              />
              <div className="text-lg text-white font-semibold">
                <span>{singleBusiness.business.average_stars}</span>
                <span className="ml-1">
                  ({singleBusiness.business.review_count}) reviews
                </span>
              </div>
            </div>
            <div className="max-w-44 mt-2">
              <Button
                onClick={() =>
                  handleReviewNavigateClick({
                    businessName: singleBusiness.business.name,
                  })
                }
                label="Write a review"
              ></Button>
            </div>
          </div>
        </div>
        {/* review list for business */}
        <ReviewList businessId={singleBusiness.business.id} />
      </div>
    );
  }
};

export default SingleBusiness;
