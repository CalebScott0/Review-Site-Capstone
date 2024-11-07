import { useCallback } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { useGetPhotosQuery } from "../../services/businessesApi";

import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ListingsCarousel = ({ businessId }) => {
  const { data, error, isLoading } = useGetPhotosQuery({ businessId });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    skipSnaps: false,
  });

  // carousel scroll functions
  const scrollPrev = useCallback(
    (e) => {
      // prevent click from bubbling up to card
      e.stopPropagation();
      emblaApi && emblaApi.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e) => {
      // prevent click from bubbling up to card
      e.stopPropagation();
      emblaApi && emblaApi.scrollNext();
    },
    [emblaApi]
  );

  if (isLoading) return <div>We loading pictures gang</div>;

  if (data) {
    return (
      <div className="relative w-44 sm:w-52">
        {/* <div className="relative w-40 sm:w-52"> */}
        {/* carousel viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {data.photos.map((photo) => (
              <div className="relative min-w-full select-none" key={photo.id}>
                <img
                  src={photo.signed_url}
                  alt={photo.label}
                  className="object-cover w-full h-44 sm:h-52"
                  // className="object-cover w-full h-40 sm:h-52"
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
  }
};

export default ListingsCarousel;
