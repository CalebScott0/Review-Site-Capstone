const SingleBusinessCarousel = ({ photos }) => {
  // Duplicate if small amount of images to fill at least 6 images for the carousel
  if (photos?.length) {
    const repeatedPhotos = [...photos];
    let i = 0;
    while (repeatedPhotos.length < 6) {
      repeatedPhotos.push(photos[i]);
      // reset i to 0 if at end of array or increment 1
      i = i + 1 === photos?.length ? 0 : i + 1;
    }

    // ADD NEXT AND PREV BUTTONS ?

    return (
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
