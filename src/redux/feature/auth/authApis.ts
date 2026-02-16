import { baseApi } from "../../feature/baseApi";
import { tagTypes } from "../../tagTypes";
import { jwtDecode } from "jwt-decode";
import { ErrorToast } from "../../../lib/utils";
import { SetUser } from "./authSlice";
import type { TDecodedToken, TError } from "../../../types/global.types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.user],
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data?.data?.accessToken;
          const refreshToken = data?.data?.refreshToken;

          if (!accessToken) {
            ErrorToast("Invalid login response.");
            return;
          }

          const decoded = jwtDecode<TDecodedToken>(accessToken);
          if (decoded?.role !== "superAdmin" && decoded?.role !== "admin") {
            ErrorToast("You are not authorized to login.");
            return;
          }

          // Set access token and refresh token
          dispatch(SetUser({ accessToken, refreshToken }));
        } catch (err) {
          const error = err as TError;
          ErrorToast(error?.message || "Something went wrong");
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgotPass",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verifyOtp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/resetPass",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/resendOtp",
        method: "POST",
        body: email,
      }),
    }),
    refreshToken: builder.mutation({
      query: (token) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: token,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/changePassword",
        method: "POST",
        body: data,
      }),
    }),
    myProfile: builder.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useMyProfileQuery,
} = authApi;
