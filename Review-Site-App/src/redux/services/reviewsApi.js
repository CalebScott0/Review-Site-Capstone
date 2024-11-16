import { api } from "./index";

const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ businessId, data }) => ({
        url: `reviews/business/${businessId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { businessId }) => [
        { type: "business", id: businessId }, // Invalidate the business data for the specific business
        { type: "reviews", id: businessId }, // Invalidate the reviews data for the specific business
        "user", //  invalidate user data
      ],
    }),
  }),
});

export const { useAddReviewMutation } = reviewsApi;

export default reviewsApi; // Exporting reviewsApi for use in store
