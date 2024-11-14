import { DotLoader } from "react-spinners";
import { useGetPhotosQuery } from "../../services/businessesApi.js";

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
      <div className="text-red-500 text-2xl text-center h-72 bg-neutral-300 pt-2">
        Unable to show pictures
      </div>
    ) : isLoading ? (
      <div className="h-72 flex justify-center my-10 items-center">
        <DotLoader />
      </div>
    ) : (
      <div className="carousel relative">
        {repeatedPhotos?.map((photo, idx) => (
          <div key={idx} className="carousel-item">
            <img
              className="w-full h-full object-cover"
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
