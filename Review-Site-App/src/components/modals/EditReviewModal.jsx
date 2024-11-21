import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { onEditReviewClose } from "../../redux/slices/editReviewModalSlice";

const EditReviewModal = ({}) => {
  const dispatch = useDispatch();

  const isEditReviewOpen = useSelector((state) => state.editReviewModal.isOpen);
  const reviewToUpdate = useSelector((state) => state.editReviewModal.review);

  const handleClose = () => {
    dispatch(onEditReviewClose());
  };

  //   const bodyContent = ()

  return (
    <Modal
      actionLabel="Continue"
      isOpen={isEditReviewOpen}
      onClose={() => handleClose()}
      //   OnSubmit
      secondaryActionLabel="Cancel"
      secondaryAction={() => {}}
      title="Edit your review"
    />
  );
};

export default EditReviewModal;
