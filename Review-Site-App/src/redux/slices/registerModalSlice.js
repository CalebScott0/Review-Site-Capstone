import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};
const registerModalSlice = createSlice({
  name: "registerModal",
  initialState,
  reducers: {
    onRegisterOpen(state) {
      state.isOpen = true;
    },
    onRegisterClose(state) {
      state.isOpen = false;
    },
  },
});

export const { onRegisterOpen, onRegisterClose } = registerModalSlice.actions;

export default registerModalSlice.reducer;
