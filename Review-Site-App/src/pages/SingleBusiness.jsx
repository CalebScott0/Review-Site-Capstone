import { useLocation } from "react-router-dom";
import { useGetSingleBusinessQuery } from "../services/businessesApi";
import ReactStars from "react-stars";
import SingleBusinessCarousel from "../components/carousels/SingleBusinessCarousel";
import ReviewList from "../components/ReviewList";

const SingleBusiness = () => {
  const { state } = useLocation();
  // grab businessId from location state
  const { businessId } = state;

  const {
    data: singleBusiness,
    error,
    isLoading,
  } = useGetSingleBusinessQuery({ businessId });

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
          </div>
        </div>
        {/* review list for business */}
        <ReviewList businessId={singleBusiness.business.id} />
      </div>
    );
  }
};

export default SingleBusiness;
