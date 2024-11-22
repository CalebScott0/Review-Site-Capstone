import { useCallback, useEffect, useState } from "react";
import Avatar from "../Avatar";
import Card from "..//cards/Card";
import CardHeader from "..//cards/CardHeader";
import CardContent from "..//cards/CardContent";
// import CardFooter from "..//cards/CardFooter";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaRegStar } from "react-icons/fa";
import ReactStars from "react-stars";
import Button from "../Button";
import { IoCloseOutline } from "react-icons/io5";

const RecentReviewList = ({ error, reviews }) => {
  // default open on larger > screens
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1040);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const reviewDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!error)
    return isOpen && reviews ? (
      <div
        // ${isOpen ? "translate-x-0" : "translate-x-full"}
        className={`lg:relative absolute right-0 z-10 bg-white w-full h-full max-w-sm shadow-md border rounded-md transform transition-transform duration-300`}
      >
        {/* recent reviews header */}
        <div className="pt-12 pl-4 text-xl font-semibold tracking-wide pb-4 ">
          See what other users are saying
        </div>
        <hr className="w-5/6 ml-4" />
        {/* // list of 10 recent reviews cards */}
        {reviews.map((review) => (
          <div key={review.id}>
            <Card className=" mx-2 border-b">
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
        {/* button toggle to open and close menu (open by default on mount) */}
        <div
          onClick={() => toggleOpen()}
          className="absolute top-1 sm:top-10 sm:left-0 left-8 -translate-x-[25.5px] bg-neutral-100 hover:bg-neutral-300 xl:bg-white lg:hover:bg-neutral-100/80 rounded-sm border cursor-pointer sm:py-4 py-1 px-1"
        >
          <FaChevronRight className="hidden sm:block" />
          <span className="block sm:hidden">
            Close <IoCloseOutline className="inline" />
          </span>
        </div>
        {/* <div
          onClick={() => toggleOpen()}
          className="absolute top-10 -translate-x-[25.5px] bg-neutral-100 hover:bg-neutral-300 xl:bg-white lg:hover:bg-neutral-100/80 rounded-sm border cursor-pointer py-4 px-1"
        >
          <FaChevronRight />
        </div> */}
      </div>
    ) : (
      <div>
        <div
          onClick={() => toggleOpen()}
          className="hidden lg:block absolute right-0 top-10 bg-neutral-100/80 hover:bg-neutral-300/80 py-4 px-1 cursor-pointer border rounded-sm"
        >
          <FaChevronLeft />
        </div>
        <div className="lg:hidden -top-4 md:top-5 absolute right-0">
          <Button label="See Recent Reviews" onClick={() => toggleOpen()} />
        </div>
      </div>
    );
};

export default RecentReviewList;
