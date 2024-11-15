import { useGetPhotosQuery } from "../../../redux/services/businessesApi";
const BusinessSearchLabel = ({ business }) => {
  const { data, error, isLoading } = useGetPhotosQuery({
    businessId: business.id,
    limit: 1,
  });

  if (isLoading || error) return;

  const photoUrl = data?.photos[0].signed_url;
  if (photoUrl) {
    return (
      <div
        className="tracking-wide flex items-center gap-2"
        // hide location menu on smaller screens
      >
        <div className="w-8 h-8 box-content border-neutral-500 border-[0.5px] object-cover">
          <img className="w-full h-full" alt="data" src={photoUrl} />
        </div>
        <div>
          <div>{business.name}</div>
          <div className="text-neutral-500 font-normal text-sm">{`${business.city}, ${business.state}`}</div>
        </div>
      </div>
    );
  }
};

export default BusinessSearchLabel;
