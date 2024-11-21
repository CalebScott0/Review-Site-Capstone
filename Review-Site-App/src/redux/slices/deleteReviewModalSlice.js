import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};
const deleteReviewModalSlice = createSlice({
  name: "deleteReviewModal",
  initialState,
  reducers: {
    onDeleteReviewOpen(state) {
      state.isOpen = true;
    },
    onDeleteReviewClose(state) {
      console.log("closing modal");

      state.isOpen = false;
    },
  },
});

export const { onDeleteReviewOpen, onDeleteReviewClose } =
  deleteReviewModalSlice.actions;

export default deleteReviewModalSlice.reducer;
