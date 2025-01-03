import {
  FaRegEdit,
  FaRegLaughBeam,
  FaRegLightbulb,
  FaRegStar,
  FaRegTrashAlt,
} from 'react-icons/fa';
import { BsEmojiSunglasses } from 'react-icons/bs';
import Avatar from '../Avatar';
import Card from '../cards/Card';
import CardHeader from '../cards/CardHeader';
import CardContent from '../cards/CardContent';
import { RiContactsBook2Line } from 'react-icons/ri';
import ReactStars from 'react-stars';
import Heading from '../Heading';
import { AiOutlineMenu } from 'react-icons/ai';

import { useGetUserReviewForBusinessQuery } from '../../redux/services/usersApi';
import { useCallback, useEffect, useState } from 'react';
import MenuItem from '../navbar/MenuItem';
import DeleteReviewModal from '../modals/DeleteReviewModal';
import { useDispatch } from 'react-redux';
import { onDeleteReviewOpen } from '../../redux/slices/deleteReviewModalSlice';
import { onEditReviewOpen } from '../../redux/slices/editReviewModalSlice';
import EditReviewModal from '../modals/EditReviewModal';

const UserReviewBusiness = ({
  businessId,
  reviewDateFunc,
  setUserHasReview,
  userId,
}) => {
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

  useEffect(() => {
    // update state after render
    if (review) setUserHasReview(true);

    // clean up on unMount (when user leaves page or when review is deleted);
    // will reset to true if user just leaves page and comes back on remount above
    return () => {
      if (!review) setUserHasReview(false);
    };
  }, [review, setUserHasReview]);

  const onEditReviewClick = useCallback(() => {
    // pass text and stars into action payload for state
    dispatch(
      onEditReviewOpen({
        id: review?.id,
        text: review?.review_text,
        stars: review?.stars,
      })
    );
  }, [dispatch, review?.id, review?.review_text, review?.stars]);

  if (isLoading) {
    return;
  }

  if (review) {
    const onDeleteReviewClick = () => {
      dispatch(onDeleteReviewOpen());
      // setIsOpen(false);
      // toggleOpen();
    };

    return (
      <Card
        key={review.id}
        className='mx-auto my-4 max-w-4xl rounded-md border-2 shadow-sm'
      >
        <div className='my-4 flex items-center justify-between border-b'>
          <Heading title='Your review:' />
          {/* menu for user review options */}
          <div className='relative mb-2 mr-4 cursor-pointer text-neutral-500'>
            <div
              className='rounded-full border p-2 hover:shadow-md'
              onClick={() => toggleOpen()}
            >
              <AiOutlineMenu size={22} />
            </div>
            {isOpen && (
              <div className='absolute right-0 top-11 z-10 w-40 rounded-md border bg-white text-black shadow-sm'>
                <div className='relative'>
                  <MenuItem
                    icon={FaRegEdit}
                    label='Edit Review'
                    handleClick={onEditReviewClick}
                  />
                </div>
                <hr />
                <div className='relative text-rose-500'>
                  <MenuItem
                    handleClick={onDeleteReviewClick}
                    icon={FaRegTrashAlt}
                    label='Delete Review'
                  />
                </div>
                {/* modal to confirm review deletion */}
                <DeleteReviewModal
                  reviewId={review.id}
                  businessId={businessId}
                />
                {/* modal for editing review */}
                <EditReviewModal businessId={businessId} />
              </div>
            )}
          </div>
        </div>
        {/* user avatar (placeholder) and information */}
        <CardHeader className='flex gap-4'>
          <Avatar size={40} userId={userId} />
          <div>
            <span className='text-base text-black'>
              {review.first_name} {review.last_name[0]}.
            </span>
            <div className='flex gap-1 text-center text-neutral-600'>
              {/* display count of user friends and reviews */}
              <RiContactsBook2Line />
              <span className='text-sm'>{review.friend_count}</span>
              <FaRegStar className='ml-0.5' />
              <span className='text-sm'>{review.review_count}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* review star rating and date */}
          <div className='flex items-center gap-2'>
            <ReactStars
              edit={false}
              size={24}
              color2='#ff007f'
              value={review.stars}
            />
            {reviewDateFunc(review.created_at)}
          </div>
          {/* review text */}
          <div className='mt-2 text-black'>{review.review_text}</div>
        </CardContent>
        {/* Card Footer for useful, funny, and cool ratings of review*/}
        <section className='mt-4 flex gap-4'>
          <div className='flex flex-col'>
            <button className='btn btn-disabled btn-circle mx-auto mb-1 border-neutral-500 bg-white'>
              <FaRegLightbulb size={22} />
            </button>
            <div>Useful {review.useful}</div>
          </div>
          <div>
            <button className='btn btn-disabled btn-circle mx-auto mb-1 border-neutral-500 bg-white hover:shadow-md'>
              <FaRegLaughBeam size={22} />
            </button>
            <div>Funny {review.funny}</div>
          </div>
          <div>
            <button className='btn btn-disabled btn-circle mx-auto mb-1 border-neutral-500 bg-white hover:shadow-md'>
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
