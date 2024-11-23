import { DotLoader } from 'react-spinners';
import { useGetPhotosQuery } from '../../redux/services/businessesApi.js';

/*
 * TODO:
 *    - add prev/next buttons to single business carousel
 */

const SingleBusinessCarousel = ({ businessId }) => {
  // fetch business photos for passed in id
  const { data: photos, error, isLoading } = useGetPhotosQuery({ businessId });

  // Duplicate if small amount of images to fill at least 6 images for the carousel
  if (photos?.photos.length) {
    const repeatedPhotos = [...photos.photos];
    let i = 0;
    while (repeatedPhotos.length < 6) {
      repeatedPhotos.push(photos.photos[i]);
      // reset i to 0 if at end of array or increment 1
      i = i + 1 === photos.photos?.length ? 0 : i + 1;
    }

    return error ? (
      <div className='h-72 bg-neutral-300 pt-2 text-center text-2xl text-rose-500'>
        Unable to show pictures
      </div>
    ) : isLoading ? (
      <div className='my-10 flex h-72 items-center justify-center'>
        <DotLoader />
      </div>
    ) : (
      <div className='carousel relative'>
        {repeatedPhotos?.map((photo, idx) => (
          <div key={idx} className='carousel-item'>
            <img
              className='h-full w-full object-cover'
              alt={photo.label}
              src={photo.signed_url}
            />
          </div>
        ))}
      </div>
    );
  }
};

export default SingleBusinessCarousel;
