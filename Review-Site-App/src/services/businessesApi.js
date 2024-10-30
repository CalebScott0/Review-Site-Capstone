import { api } from "./index";

const businessesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBusiness: builder.query({
      query: (businessId) => `businesses/${businessId}`,
      providesTags: (result, error, id) => [{ type: "Businesses", id }],
    }),
    getListings: builder.query({
      query: ({ categoryId, city, state, page, limit = 10 }) =>
        `businesses/categories/${categoryId}?city=${city}&state=${state}&limit=${limit}&offset=${page * limit}`,
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
      query: (id) => `businesses/${id}/photos`,
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetPhotosQuery,
  useGetSingleBusinessQuery,
} = businessesApi;
