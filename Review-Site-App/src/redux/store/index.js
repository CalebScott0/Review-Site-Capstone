import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services";
import registerModalReducer from "../slices/registerModalSlice";
import loginModalReducer from "../slices/loginModalSlice";
import authReducer from "../services/authSlice";
import reviewsApi from "../services/reviewsApi"; // Your reviewsApi

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer, // Reviews API
    auth: authReducer,
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(reviewsApi.middleware), // Reviews API middleware
});
