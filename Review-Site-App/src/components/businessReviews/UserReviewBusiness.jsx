import {
  FaRegEdit,
  FaRegLaughBeam,
  FaRegLightbulb,
  FaRegStar,
  FaRegTrashAlt,
} from "react-icons/fa";
import { BsEmojiSunglasses } from "react-icons/bs";
import Avatar from "../Avatar";
import Card from "../cards/Card";
import CardHeader from "../cards/CardHeader";
import CardContent from "../cards/CardContent";
import { RiContactsBook2Line } from "react-icons/ri";
import ReactStars from "react-stars";
import Heading from "../Heading";
import { AiOutlineMenu } from "react-icons/ai";

import { useGetUserReviewForBusinessQuery } from "../../redux/services/usersApi";
import { useCallback, useState } from "react";
import MenuItem from "../navbar/MenuItem";
import DeleteReviewModal from "../modals/DeleteReviewModal";
import { useDispatch } from "react-redux";
import { onDeleteReviewOpen } from "../../redux/slices/deleteReviewModalSlice";

const UserReviewBusiness = ({ businessId, reviewDateFunc, userId }) => {
  // state for review options menu
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const {
    data: userReview,
    error,
    isLoading,
  } = useGetUserReviewForBusinessQuery({
    userId,
    businessId,
  });
  const review = userReview?.user_review_for_business[0];

  const onDeleteReviewClick = () => {
    dispatch(onDeleteReviewOpen());
    // setIsOpen(false);
    // toggleOpen();
  };

  if (review) {
    return (
      <Card
        key={review.id}
        className="max-w-4xl mx-auto border-2 shadow-sm rounded-md my-4"
      >
        <div className="border-b my-4 flex justify-between items-center">
          <Heading title="Your review:" />
          {/* menu for user review options */}
          <div className="relative cursor-pointer text-neutral-500 mb-2 mr-4">
            <div
              className="border p-2 rounded-full hover:shadow-md"
              onClick={() => toggleOpen()}
            >
              <AiOutlineMenu size={22} />
            </div>
            {isOpen && (
              <div className="absolute border bg-white shadow-sm w-40 right-0 top-11 rounded-md z-10 text-black">
                <div className="relative">
                  <MenuItem icon={FaRegEdit} label="Edit Review" />
                </div>
                <hr />
                <div className="relative text-rose-500">
                  <MenuItem
                    handleClick={onDeleteReviewClick}
                    icon={FaRegTrashAlt}
                    label="Delete Review"
                  />
                </div>
                {/* modal to confirm review deletion */}
                <DeleteReviewModal />
              </div>
            )}
          </div>
        </div>
        {/* user avatar (placeholder) and information */}
        <CardHeader className="flex gap-4">
          <Avatar size={40} />
          <div>
            <span className="text-base text-black">
              {review.first_name} {review.last_name[0]}.
            </span>
            <div className="text-neutral-600 flex gap-1 text-center">
              {/* display count of user friends and reviews */}
              <RiContactsBook2Line />
              <span className="text-sm">{review.friend_count}</span>
              <FaRegStar className="ml-0.5" />
              <span className="text-sm">{review.review_count}</span>
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
            {reviewDateFunc(review.created_at)}
          </div>
          {/* review text */}
          <div className="mt-2 text-black">{review.review_text}</div>
        </CardContent>
        {/* Card Footer for useful, funny, and cool ratings of review*/}
        <section className="flex gap-4 mt-4">
          <div className="flex flex-col">
            <button className=" border-neutral-500 btn btn-disabled btn-circle bg-white mx-auto mb-1">
              <FaRegLightbulb size={22} />
            </button>
            <div>Useful {review.useful}</div>
          </div>
          <div>
            <button className="hover:shadow-md border-neutral-500 btn btn-disabled btn-circle bg-white mx-auto mb-1">
              <FaRegLaughBeam size={22} />
            </button>
            <div>Funny {review.funny}</div>
          </div>
          <div>
            <button className="hover:shadow-md border-neutral-500 btn btn-disabled btn-circle bg-white mx-auto mb-1">
              <BsEmojiSunglasses size={22} />
            </button>
            <div>Cool {review.cool}</div>
          </div>
        </section>
      </Card>
    );
  }
};

export default UserReviewBusiness;
