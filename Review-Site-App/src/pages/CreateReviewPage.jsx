import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetReviewsForBusinessQuery } from "../redux/services/businessesApi";
import { useCallback, useEffect, useState } from "react";
import ReviewForm from "../forms/ReviewForm";
import Heading from "../components/Heading";
import Avatar from "../components/Avatar";
import Card from "../components/cards/Card";
import CardHeader from "../components/cards/CardHeader";
import CardContent from "../components/cards/CardContent";
// import CardFooter from "../components/cards/CardFooter";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaRegStar } from "react-icons/fa";
// import { DotLoader } from "react-spinners";
import ReactStars from "react-stars";
import { DotLoader } from "react-spinners";

const CreateReviewPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  // grab businessId from location state
  const { state } = useLocation();
  const { businessId } = state;

  const [showRecentReviews, setShowRecentReviews] = useState(true);

  const toggleOpen = useCallback(() => {
    setShowRecentReviews((value) => !value);
  }, []);

  // business name from url params
  const businessName = useParams().business_name;

  // if no user navigate back
  useEffect(() => {
    if (!userId) navigate(-1);
  }, [userId, navigate]);

  // recent reviews to display on side of review form
  const {
    data: businessReviews,
    error,
    isLoading,
  } = useGetReviewsForBusinessQuery({ businessId });

  const reviews = businessReviews?.reviews;

  const reviewDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div className="relative flex">
      <div className="w-2/3 lg:w-5/12 mx-auto mt-10">
        {/* Review form */}
        <ReviewForm
          userId={userId}
          businessId={businessId}
          businessName={businessName}
        />
      </div>
      {/* Side bar of most recent reviews */}
      {/* ANIMATE CLOSE AND OPEN!!! */}
      {/* MOVE INTO OWN COMPONENT WHEN DONE */}
      {showRecentReviews ? (
        <div className="w-full max-w-sm shadow-md border rounded-md">
          <div className=" pt-6 pl-4">
            <Heading title="Recent reviews" />
          </div>
          {reviews &&
            reviews.map((review) => (
              <div key={review.id}>
                <Card className="max-w-4xl mx-2 border-b">
                  {/* user avatar (placeholder) and information */}
                  <CardHeader className="flex gap-2">
                    <Avatar size={32} />
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
                    <div className="mt-2 w-10/12 line-clamp-6 text-black">
                      {review.review_text}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          <div
            onClick={() => toggleOpen()}
            className="absolute top-10 right-[25.3%] hover:bg-neutral-100/80 rounded-sm border cursor-pointer py-4 px-1"
          >
            <FaChevronRight />
          </div>
        </div>
      ) : (
        <div
          onClick={() => toggleOpen()}
          className="absolute right-0 top-10 bg-neutral-100/80 hover:bg-neutral-300/80 py-4 px-1 cursor-pointer border rounded-sm"
        >
          <FaChevronLeft />
        </div>
      )}
    </div>
  );
};

export default CreateReviewPage;