import { api } from "./index";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    regiser: builder.query({
      query: { credentials },
    }),
  }),
});
