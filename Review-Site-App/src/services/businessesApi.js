import { api } from "./index";

const businessesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBusiness: builder.query({
      query: ({ businessId }) => `businesses/${businessId}`,
      providesTags: (result, error, id) => [{ type: "Businesses", id }],
    }),
    getListings: builder.query({
      query: ({ categoryId, city, state, page, limit = 10 }) =>
        `businesses/categories/${categoryId}?city=${city}&state=${state}&limit=${limit}&page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.businesses.map(({ id }) => ({
                type: "Businesses",
                id,
              })),
              { type: "Businesses", id: "LIST" },
            ]
          : [{ type: "Businesses", id: "LIST" }],
    }),
    getPhotos: builder.query({
      query: ({ businessId, limit = 10000 }) =>
        `businesses/${businessId}/photos?limit=${limit}`,
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetPhotosQuery,
  useGetSingleBusinessQuery,
} = businessesApi;
