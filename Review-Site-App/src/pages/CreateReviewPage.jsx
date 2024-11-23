import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetReviewsForBusinessQuery } from '../redux/services/businessesApi';
import { useEffect } from 'react';
import ReviewForm from '../forms/ReviewForm';
import RecentReviewList from '../components/businessReviews/RecentReviewList';

const CreateReviewPage = ({ handleSingleBusinessClick }) => {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  // grab businessId from location state
  const businessId = useParams().business_id;

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
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!isLoading) {
    return (
      <div className='relative flex'>
        <div className='mx-2 mt-10 w-full max-w-2xl sm:mx-10 md:mx-auto'>
          {/* Review form */}
          <ReviewForm
            mode='Create'
            handleSingleBusinessClick={handleSingleBusinessClick}
            userId={userId}
            businessId={businessId}
            businessName={businessName}
          />
        </div>
        {/* Side bar of most recent reviews - hidden on mobile*/}
        {/* ANIMATE CLOSE AND OPEN!!! */}
        <RecentReviewList
          reviews={reviews}
          reviewDate={reviewDate}
          error={error}
        />
      </div>
    );
  }
};

export default CreateReviewPage;
