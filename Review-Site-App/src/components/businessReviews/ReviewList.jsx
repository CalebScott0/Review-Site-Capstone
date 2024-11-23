import { useGetReviewsForBusinessQuery } from "../../redux/services/businessesApi";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import Avatar from "../Avatar";
import Container from "../Container";
import Card from "../cards/Card";
import CardHeader from "../cards/CardHeader";
import CardContent from "../cards/CardContent";
import UserReviewBusiness from "./UserReviewBusiness";
// import CardFooter from "../components/cards/CardFooter";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaRegLaughBeam, FaRegLightbulb, FaRegStar } from "react-icons/fa";
import { BsEmojiSunglasses } from "react-icons/bs";
import { DotLoader } from "react-spinners";
import { toast } from "react-hot-toast";

import ReactStars from "react-stars";
import PaginationMenu from "../PaginationMenu";

const ReviewList = ({ businessId, setUserHasReview, userId }) => {
  // datalabel of main data to grab in paginated fetch
  const dataLabel = "reviews";

  const {
    items: reviews,
    error,
    isLoading,
    handlePageChange, //function to change pages
    isFetchingNextPage,
    currentPage,
    totalPages,
    paginationRange,
  } = usePaginatedFetch(
    useGetReviewsForBusinessQuery,
    {
      businessId,
      limit: 10,
    },
    dataLabel
  );

  if (error) {
    toast.error("Failed to load reviews.");

    return (
      <div className="text-rose-500 text-center text-2xl mt-10">
        Unable to show reviews, please try again.
      </div>
    );
  }

  if (isFetchingNextPage || isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <DotLoader size={30} color="#cccccc" />
      </div>
    );
  }

  const reviewDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (reviews[0])
    return (
      <Container>
        <UserReviewBusiness
          businessId={businessId}
          reviewDateFunc={reviewDate}
          setUserHasReview={setUserHasReview}
          userId={userId}
        />
        {reviews &&
          // filter out review with userId if exists
          reviews
            .filter((review) => review.author_id !== userId)
            .map((review) => (
              <Card key={review.id} className="max-w-4xl mx-auto border-b mb-4">
                {/* user avatar (placeholder) and information */}
                <CardHeader className="flex gap-4">
                  <Avatar size={40} userId={review.author_id} />
                  <div>
                    <span className="text-base text-black">
                      {review.author_first_name} {review.author_last_name[0]}.
                    </span>
                    <div className="text-neutral-600 flex gap-1 text-center">
                      {/* display count of user friends and reviews */}
                      <RiContactsBook2Line />
                      <span className=" text-sm">
                        {review.author_friend_count}
                      </span>
                      <FaRegStar className="transform -scale-x-100 ml-0.5" />
                      <span className=" text-sm">
                        {review.author_review_count}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* review star rating and date */}
                  <div className="flex items-center gap-2">
                    <ReactStars
                      edit={false}
                      size={24}
                      color2="#ff007f"
                      value={review.stars}
                    />
                    {reviewDate(review.created_at)}
                  </div>
                  {/* review text */}
                  <div className="mt-2 text-black">{review.review_text}</div>
                </CardContent>
                {/* Card Footer for useful, funny, and cool ratings of review*/}
                <section className="flex gap-4 mt-4">
                  <div className="flex flex-col">
                    <button className="hover:shadow-md border-neutral-500 btn btn-circle bg-white mx-auto mb-1">
                      <FaRegLightbulb size={22} />
                    </button>
                    <div>Useful {review.useful}</div>
                  </div>
                  <div>
                    <button className="hover:shadow-md border-neutral-500 btn btn-circle bg-white mx-auto mb-1">
                      <FaRegLaughBeam size={22} />
                    </button>
                    <div>Funny {review.funny}</div>
                  </div>
                  <div>
                    <button className="hover:shadow-md border-neutral-500 btn btn-circle bg-white mx-auto mb-1">
                      <BsEmojiSunglasses size={22} />
                    </button>
                    <div>Cool {review.cool}</div>
                  </div>
                </section>
              </Card>
            ))}
        <div className="flex w-full justify-center">
          <PaginationMenu
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            paginationRange={paginationRange}
            totalPages={totalPages}
          />
        </div>
      </Container>
    );
};

export default ReviewList;
