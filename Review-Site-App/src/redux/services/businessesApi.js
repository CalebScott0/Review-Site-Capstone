import { api } from "./index";

const businessesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBusiness: builder.query({
      query: ({ businessId }) => `businesses/${businessId}`,
      providesTags: (result, error, id) => [{ type: "business", id }],
    }),
    getListingsByCategory: builder.query({
      query: ({ categoryId, city, state, page, limit = 10 }) =>
        `businesses/categories/${categoryId}?city=${city}&state=${state}&limit=${limit}&page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.businesses.map(({ id }) => ({
                type: "business",
                id,
              })),
              { type: "business", id: "LIST" },
            ]
          : [{ type: "business", id: "LIST" }],
    }),
    getListingsByName: builder.query({
      query: ({ businessName, city, state, page, limit = 10 }) =>
        `businesses/name/${businessName}?city=${city}&state=${state}&limit=${limit}&page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.businesses.map(({ id }) => ({
                type: "business",
                id,
              })),
              { type: "business", id: "LIST" },
            ]
          : [{ type: "business", id: "LIST" }],
    }),
    getPhotos: builder.query({
      // high limit passed in to grab all photos unless specified limit
      query: ({ businessId, limit = 10000 }) =>
        `businesses/${businessId}/photos?limit=${limit}`,
    }),
    getReviewsForBusiness: builder.query({
      // page and limit for paginated results
      query: ({ businessId, page, limit = 10 }) =>
        `businesses/${businessId}/reviews?limit=${limit}&page=${page}`,
    }),
  }),
});

export const {
  useGetListingsByCategoryQuery,
  useGetListingsByNameQuery,
  useGetPhotosQuery,
  useGetReviewsForBusinessQuery,
  useGetSingleBusinessQuery,
} = businessesApi;
