import { useLocation } from "react-router-dom";
import {
  useGetSingleBusinessQuery,
  useGetPhotosQuery,
} from "../services/businessesApi";

const SingleBusiness = () => {
  const { state } = useLocation();
  // grab businessId from location state
  const { businessId } = state;

  const {
    data: business,
    error: businessError,
    isLoading: isBusinessLoading,
  } = useGetSingleBusinessQuery(businessId);
  const {
    data: photo,
    error: photosError,
    isLoading: isPhotosLoading,
  } = useGetPhotosQuery(businessId);

  return (
    <div className="pt-44">Lets look at a business gang {businessId} </div>
  );
};

export default SingleBusiness;
