import { api } from "./index";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserReviewForBusiness: builder.query({
      query: ({ userId, businessId }) =>
        `users/${userId}/review/business/${businessId}`,
    }),
  }),
});

export const { useGetUserReviewForBusinessQuery } = usersApi;

export default usersApi;
