import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["business", "reviews", "user"],
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:8080/api",
    baseUrl: "https://api-review-site.onrender.com/api",
    // if exists, grab token from auth slice & set header
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
