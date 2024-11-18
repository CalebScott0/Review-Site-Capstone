import Heading from "../Heading";
import Modal from "./Modal";
import { onDeleteReviewClose } from "../../redux/slices/deleteReviewModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useDeleteReviewMutation } from "../../redux/services/reviewsApi";
import toast from "react-hot-toast";

const DeleteReviewModal = ({ businessId, reviewId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [deleteReview] = useDeleteReviewMutation();

  const isDeleteReviewOpen = useSelector(
    (state) => state.deleteReviewModal.isOpen
  );

  const handleClose = () => {
    dispatch(onDeleteReviewClose());
  };

  const handleSubmit = async () => {
    // setError(null);
    setIsLoading(true);
    try {
      await deleteReview({ businessId, reviewId }).unwrap();
      toast.success("Review deleted.");
      // dispatch(onDeleteReviewClose());
    } catch (error) {
      console.log(error);
      if (error.data?.error?.message) {
        toast.error(error.data.error.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div>
      <Heading
        center
        warningLabel
        title="Delete review?"
        subtitle="This action cannot be undone"
      />
      {/* <div className="flex gap-2 mt-10 -mb-10 mx-6">
        <Button outline label="Cancel" onClick={handleClose} />
        <Button warning label="Delete" />
      </div> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      warning
      onClose={() => handleClose()}
      onSubmit={() => handleSubmit()}
      isOpen={isDeleteReviewOpen}
      title="Confirm Review Deletion"
      actionLabel="Delete"
      secondaryAction={() => {}}
      secondaryActionLabel="Cancel"
      body={bodyContent}
    />
  );
};

export default DeleteReviewModal;
