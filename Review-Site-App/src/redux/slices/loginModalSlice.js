import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};
const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    onLoginOpen(state) {
      state.isOpen = true;
    },
    onLoginClose(state) {
      state.isOpen = false;
    },
  },
});

export const { onLoginOpen, onLoginClose } = loginModalSlice.actions;

export default loginModalSlice.reducer;
