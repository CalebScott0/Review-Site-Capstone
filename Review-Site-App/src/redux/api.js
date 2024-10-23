import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-review-site.onrender.com/api",
  }),
  // tagTypes: ["businesses"],
  endpoints: (builder) => ({
    getListings: builder.query({
      query: ({ categoryId, limit = 10, offset = 0, city, state }) =>
        `businesses/categories/${categoryId}?city=${city}&state=${state}&limit=${limit}&offset=${offset}}`,
      // providesTags: ["businesses"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListingsQuery } = api;
