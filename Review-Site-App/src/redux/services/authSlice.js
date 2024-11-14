import { api } from "./index";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

// initialize cookies
export const cookies = new Cookies();
// cookies key
const JWT = "jwt_authorization";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: `auth/register`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

// Store payload token in state and set to cookie
const storeToken = (state, { payload }) => {
  // Decode jwt token
  const decoded = jwtDecode(payload.token);
  state.token = payload.token;
  state.userId = decoded.id;

  localStorage.setItem("USER_ID", decoded.id);
  // set cookies with expiration date
  cookies.set(JWT, payload.token, {
    path: "/",
    // httpOnly: true,
    expires: new Date(decoded.exp * 1000),
  });
};

// store token on login / register success
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: cookies.get(JWT),
    userId: localStorage.getItem("USER_ID"),
  },
  reducers: {},
  /* on fulfilled action: store token / remove token
   *  & match on redux action storeToken for login/register
   *     matchFulfilled: Matcher<FulfilledAction> */
  extraReducers: (builder) => {
    // builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    // builder.addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
    //   state.token = null;
    //   state.userId = null;
    //   cookies.remove(JWT);
    //   localStorage.removeItem("USER_ID");
    // });
  },
});

export default authSlice.reducer;

export const {
  // useLoginMutation,
  // useLogoutMutation,
  useRegisterMutation,
  // useGetMeQuery,
} = authApi;
