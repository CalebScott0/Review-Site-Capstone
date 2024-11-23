import { useCallback } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import { useGetPhotosQuery } from '../../redux/services/businessesApi';

import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import { DotLoader } from 'react-spinners';

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

  if (error) {
    return (
      <div className='flex h-44 w-44 items-center bg-neutral-300 px-2 text-center text-xl text-rose-500'>
        Unable to show pictures
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='my-10 flex h-44 w-44 justify-center'>
        <DotLoader />
      </div>
    );
  }

  if (data) {
    return (
      <div className='relative w-44'>
        {/* <div className="relative w-40"> */}
        {/* carousel viewport */}
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {data.photos.map((photo) => (
              <div className='relative min-w-full select-none' key={photo.id}>
                <img
                  src={photo.signed_url}
                  alt={photo.label}
                  className='h-44 w-full object-cover'
                  // className="object-cover w-full h-40"
                />
              </div>
            ))}
          </div>
        </div>
        {/* previous button */}
        <button
          className='absolute left-1 top-1/2 -translate-y-1/2 transform'
          onClick={scrollPrev}
        >
          <FaChevronCircleLeft
            size={22}
            className={`rounded-full bg-neutral-500 bg-opacity-50 text-neutral-100/40 ${data.photos.length > 1 ? 'hover:text-neutral-100/80 active:scale-95' : ''}`}
          />
        </button>
        <button
          className='absolute right-1 top-1/2 -translate-y-1/2 transform'
          onClick={scrollNext}
        >
          <FaChevronCircleRight
            size={22}
            className={`rounded-full bg-neutral-500 bg-opacity-50 text-neutral-100/40 ${data.photos.length > 1 ? 'hover:text-neutral-100/80 active:scale-95' : ''}`}
          />
        </button>
      </div>
    );
  }
};

export default ListingsCarousel;
