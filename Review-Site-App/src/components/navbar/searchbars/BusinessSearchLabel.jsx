import { useGetPhotosQuery } from '../../../redux/services/businessesApi';
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
        className='flex items-center gap-2 tracking-wide'
        // hide location menu on smaller screens
      >
        <div className='box-content h-8 w-8 border-[0.5px] border-neutral-500 object-cover'>
          <img className='h-full w-full' alt='data' src={photoUrl} />
        </div>
        <div>
          <div>{business.name}</div>
          <div className='text-sm font-normal text-neutral-500'>{`${business.city}, ${business.state}`}</div>
        </div>
      </div>
    );
  }
};

export default BusinessSearchLabel;
