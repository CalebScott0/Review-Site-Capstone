import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    // baseUrl: "https://api-review-site.onrender.com/api",
  }),
  tagTypes: ["Businesses"],
  endpoints: () => ({}),
});
