import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  review: {
    text: "",
    stars: 0,
  },
};
const editReviewModalSlice = createSlice({
  name: "editReviewModal",
  initialState,
  reducers: {
    onEditReviewOpen(state, action) {
      // on open set original text and stars of review for user to edit
      const { text, stars } = action.payload;
      state.isOpen = true;
      state.review.stars = stars;
      state.review.text = text;
    },
    onEditReviewClose(state) {
      state.isOpen = false;
      state.isModalOpen = false;
      state.review = { text: "", stars: 0 };
    },
  },
});

export const { onEditReviewOpen, onEditReviewClose } =
  editReviewModalSlice.actions;

export default editReviewModalSlice.reducer;
