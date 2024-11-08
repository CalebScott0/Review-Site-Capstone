import { useLocation } from "react-router-dom";
import {
  useGetSingleBusinessQuery,
  useGetPhotosQuery,
} from "../services/businessesApi";
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
  console.log(singleBusiness?.business);
  const {
    data: businessImages,
    error: photosError,
    isLoading: isPhotosLoading,
  } = useGetPhotosQuery({ businessId });

  if (singleBusiness) {
    return (
      <div className="relative">
        <SingleBusinessCarousel photos={businessImages?.photos} />
        {/* <div className="absolute top-0 left-0 z-5 w-full h-full bg-black/40"></div> */}
        <div className="z-10 text-shadow font-[poppins] font-bold text-5xl absolute bottom-[30%] left-[7%]">
          {singleBusiness?.business?.name}
        </div>
      </div>
    );
  }
};

export default SingleBusiness;
