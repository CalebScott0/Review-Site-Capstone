import Heading from "../Heading";
import Modal from "./Modal";
import { onDeleteReviewClose } from "../../redux/slices/deleteReviewModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const DeleteReviewModal = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const isDeleteReviewOpen = useSelector(
    (state) => state.deleteReviewModal.isOpen
  );

  const handleClose = () => {
    dispatch(onDeleteReviewClose());
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
