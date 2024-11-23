import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { onEditReviewClose } from '../../redux/slices/editReviewModalSlice';
import ReviewForm from '../../forms/ReviewForm';

const EditReviewModal = ({ businessId }) => {
  const dispatch = useDispatch();

  const isEditReviewOpen = useSelector((state) => state.editReviewModal.isOpen);

  const handleClose = () => {
    dispatch(onEditReviewClose());
  };

  const bodyContent = <ReviewForm mode='Edit' businessId={businessId} />;

  return (
    <Modal
      isOpen={isEditReviewOpen}
      onClose={() => handleClose()}
      secondaryActionLabel='Cancel'
      secondaryAction={() => {}}
      body={bodyContent}
      title='Edit your review'
    />
  );
};

export default EditReviewModal;
