import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useGetPhotosQuery } from "../../redux/businessesApi";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ListingsCarousel = ({ businessId }) => {
  const id = businessId;

  const { data, error, isLoading } = useGetPhotosQuery(id);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    skipSnaps: false,
  });

  // carousel scroll functions
  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  if (data)
    return (
      <div className="relative w-40 lg:w-52">
        {/* carousel viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {data.photos.map((photo) => (
              <div className="relative min-w-full select-none" key={photo.id}>
                <img
                  src={photo.signed_url}
                  alt={photo.label}
                  className="object-cover w-full h-40 lg:h-52"
                />
              </div>
            ))}
          </div>
        </div>
        {/* previous button */}
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-1"
          onClick={scrollPrev}
        >
          <FaChevronCircleLeft
            size={22}
            className={`bg-neutral-500 bg-opacity-50 rounded-full text-neutral-100/40 ${data.photos.length > 1 ? "hover:text-neutral-100/80 active:scale-95" : ""}`}
          />
        </button>
        <button
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
          onClick={scrollNext}
        >
          <FaChevronCircleRight
            size={22}
            className={`bg-neutral-500 bg-opacity-50 rounded-full text-neutral-100/40 ${data.photos.length > 1 ? "hover:text-neutral-100/80 active:scale-95" : ""}`}
          />
        </button>
      </div>
    );
};
export default ListingsCarousel;
