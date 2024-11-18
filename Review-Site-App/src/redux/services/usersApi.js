import { api } from "./index";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserReviewForBusiness: builder.query({
      query: ({ userId, businessId }) =>
        `users/${userId}/review/business/${businessId}`,
      providesTags: (result, error, { userId }) => [
        { type: "reviews", id: userId },
      ],
    }),
  }),
});

export const { useGetUserReviewForBusinessQuery } = usersApi;

export default usersApi;
