import { useParams } from 'react-router-dom';
import { useGetSingleBusinessQuery } from '../redux/services/businessesApi';
import ReactStars from 'react-stars';
import SingleBusinessCarousel from '../components/carousels/SingleBusinessCarousel';
import ReviewList from '../components/businessReviews/ReviewList';
import Button from '../components/Button';
import { DotLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { onLoginOpen } from '../redux/slices/loginModalSlice';
import { useEffect, useState } from 'react';
import { PiPencilFill } from 'react-icons/pi';

/*
 * TODO:
 *
 * FIXME:
 *  - make text / rest of info at the top of business page more readable!
 *  - Lazy loading? make page load smoother
 */

const SingleBusinessPage = ({ handleReviewNavigateClick }) => {
  // grab businessId from location params
  const { business_id } = useParams();

  const dispatch = useDispatch();

  // check if userId
  const userId = useSelector((state) => state.auth.userId);

  // State to store pending review navigation
  const [pendingReview, setPendingReview] = useState(false);
  // state if user has a review on business
  const [userHasReview, setUserHasReview] = useState(false);

  const {
    data: singleBusiness,
    error,
    isLoading,
  } = useGetSingleBusinessQuery({ businessId: business_id });

  // redirect after login if user clicked write a review before authentication & does not have a review on business currentlty
  useEffect(() => {
    // timeout to debounce the navigation
    const debounceTimeout = setTimeout(() => {
      // wait until userId exists after login
      if (userId && pendingReview) {
        if (!userHasReview) {
          // Navigate to the review form only if the user doesn't have a review
          handleReviewNavigateClick({
            businessName: singleBusiness?.business.name,
            businessId: singleBusiness?.business.id,
          });
        }
        // Reset pendingReview whether or not navigation occurs
        setPendingReview(false);
      }
    }, 300); // Delay of 300ms

    // Cleanup the timeout on dependencies change or component unmount
    return () => clearTimeout(debounceTimeout);
  }, [
    handleReviewNavigateClick,
    userId,
    pendingReview,
    singleBusiness,
    userHasReview,
  ]);

  if (error) {
    toast.error('Failed to load business.');

    return (
      <div className='mt-10 text-center text-2xl text-rose-500'>
        Unable to show business, please try again.
      </div>
    );
  }

  const handleReviewButtonClick = () => {
    if (!userId) {
      // if no user Id redirect to login
      dispatch(onLoginOpen());
      setPendingReview(true);
    } else {
      handleReviewNavigateClick({
        businessName: singleBusiness?.business.name,
        businessId: singleBusiness?.business.id,
      });
    }
  };

  if (isLoading) {
    return (
      <div className='my-8 flex justify-center'>
        <DotLoader size={30} color='#cccccc' />
      </div>
    );
  }
  const business = singleBusiness?.business;

  if (business) {
    return (
      <div className='pb-24'>
        {/* Business page Header */}
        <div className='relative'>
          {/* carousel of images displayed on top of business page */}
          <SingleBusinessCarousel businessId={business.id} />
          <div className='text-shadow absolute bottom-10 left-12 md:left-20 lg:bottom-16 lg:left-32'>
            <div>
              <span className='font-[poppins] text-4xl font-bold md:text-5xl'>
                {business.name}
              </span>
            </div>
            <div className='-mt-2 items-center gap-2 md:flex'>
              {/* Average Stars and review count */}
              <div className='flex items-center gap-2'>
                <ReactStars
                  count={5}
                  edit={false}
                  value={business.average_stars}
                  color2='#ff007f'
                  size={40}
                  // char={<FaRegStar />}
                  half={true}
                />
                {/* render average stars inline to rating stars on smaller screens */}
                <span className='inline text-lg font-semibold md:hidden'>
                  {business.average_stars}
                </span>
              </div>
              <div className='text-lg font-semibold text-white'>
                {/* render average stars normally */}
                <span className='hidden md:inline'>
                  {business.average_stars}
                </span>
                <span className='ml-1'>({business.review_count}) reviews</span>
              </div>
            </div>
            <div className='mt-2 max-w-44'>
              <Button
                disabled={userHasReview}
                onClick={() => handleReviewButtonClick()}
                label='Write a review'
                icon={PiPencilFill}
              ></Button>
            </div>
          </div>
        </div>
        {/* review list for business */}
        <ReviewList
          businessName={business.name}
          businessId={business.id}
          setUserHasReview={setUserHasReview}
          userId={userId}
        />
      </div>
    );
  }
};

export default SingleBusinessPage;
