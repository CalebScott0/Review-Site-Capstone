import { api } from "./index";

const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ businessId, data }) => ({
        url: `reviews/business/${businessId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "business", id: id.businessId }, // Invalidate the business data for the specific business
        { type: "reviews", id: id.businessId }, // Invalidate the reviews data for the specific business
        { type: "reviews", id: id.userId }, // Invalidate the review for the user
        "user", //  invalidate user data
      ],
    }),
    editReview: builder.mutation({
      query: ({ businessId, reviewId, data }) => ({
        url: `reviews/${reviewId}/business/${businessId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "business", id: id.businessId }, // Invalidate the business data for the specific business
        { type: "reviews", id: id.businessId }, // Invalidate the reviews data for the specific business
        { type: "reviews", id: id.userId }, // Invalidate the review for the user
        "user", //  invalidate user data
      ],
    }),
    deleteReview: builder.mutation({
      query: ({ businessId, reviewId }) => ({
        url: `reviews/${reviewId}/business/${businessId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "business", id: id.businessId }, // Invalidate the business data for the specific business
        { type: "reviews", id: id.businessId }, // Invalidate the reviews data for the specific business
        { type: "reviews", id: id.userId }, // Invalidate the review for the user
        "user", //  invalidate user data
      ],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useEditReviewMutation,
} = reviewsApi;

export default reviewsApi; // Exporting reviewsApi for use in store
