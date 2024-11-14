import { api } from "./index";

const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ businessId }) => `/business/${businessId}`,
      invalidatesTags: (result, error, id) => [{ type: "business", id }],
    }),
  }),
});

export const { useAddReviewMutation } = reviewsApi;
