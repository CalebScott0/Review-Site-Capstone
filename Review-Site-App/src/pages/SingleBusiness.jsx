import { useLocation } from "react-router-dom";
import {
  useGetSingleBusinessQuery,
  useGetPhotosQuery,
} from "../services/businessesApi";
import ReactStars from "react-stars";
import SingleBusinessCarousel from "../components/carousels/SingleBusinessCarousel";

const SingleBusiness = () => {
  const { state } = useLocation();
  // grab businessId from location state
  const { businessId } = state;

  const {
    data: singleBusiness,
    error: businessError,
    isLoading: isBusinessLoading,
  } = useGetSingleBusinessQuery({ businessId });

  const {
    data: businessImages,
    error: photosError,
    isLoading: isPhotosLoading,
  } = useGetPhotosQuery({ businessId });

  if (singleBusiness?.business) {
    return (
      <div className="relative">
        <SingleBusinessCarousel photos={businessImages?.photos} />
        {/* <div className="absolute top-0 left-0 z-5 w-full h-full bg-black/40"></div> */}
        <div className="text-shadow absolute bottom-[25%] left-[10%]">
          <div>
            <span className="text-5xl font-bold font-[poppins]">
              {singleBusiness.business?.name}
            </span>
          </div>
          <div className="-mt-2 flex items-center gap-2">
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
    );
  }
};

export default SingleBusiness;
