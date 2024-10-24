const ListingsCard = ({ businesses }) => {
  console.log(businesses);
  return (
    <>
      {/* EXCEPT FOR CAROUSEL, DONT PASS DATA TO THESE HEADERS, HAVE THEM TAKE {CHILDREN} WITH base text styling and dimensions! (w-full)  */}
      <CardImageCarousel></CardImageCarousel>
      <CardHeader></CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
      We about to list some shi real quick
      <div className="rating rating-half rating-lg">
        <input
          disabled
          name="rating-10"
          className="mask-half-1 mask mask-star bg-rose-500"
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-2 mask mask-star bg-rose-500"
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-1 mask mask-star bg-rose-500"
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-2 mask mask-star bg-rose-500"
          s
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-1 mask mask-star bg-rose-500"
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-2 mask mask-star bg-rose-100"
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-1 mask mask-star bg-rose-100"
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-2 mask mask-star bg-rose-100"
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-1 mask mask-star bg-rose-100"
        />
        <input
          disabled
          name="rating-10"
          className="mask-half-2 mask mask-star bg-rose-100"
        />
      </div>
    </>
  );
};

export default ListingsCard;
