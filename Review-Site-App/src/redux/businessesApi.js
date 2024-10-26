import { api } from "./api";

const businessesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: ({ categoryId, limit = 10, offset = 0, city, state }) =>
        `businesses/categories/${categoryId}?city=${city}&state=${state}&limit=${limit}&offset=${offset}}`,
      // providesTags: ["businesses"],
    }),
    getPhotos: builder.query({
      query: (id) => `businesses/${id}/photos`,
    }),
  }),
});

export const { useGetListingsQuery, useGetPhotosQuery } = businessesApi;
