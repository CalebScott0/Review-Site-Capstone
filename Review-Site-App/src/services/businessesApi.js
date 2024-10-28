import { api } from ".";

const businessesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: ({ categoryId, city, state, page, limit = 10 }) =>
        `businesses/categories/${categoryId}?city=${city}&state=${state}&limit=${limit}&offset=${page * limit}`,
    }),
    getPhotos: builder.query({
      query: (id) => `businesses/${id}/photos`,
    }),
  }),
});

export const { useGetListingsQuery, useGetPhotosQuery } = businessesApi;
