
import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

const settingsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/privacy/retrive",
        method: "GET",
      }),
      providesTags: [tagTypes.privacy],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacy/create-or-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.privacy],
    }),
    getTermsConditions: builder.query({
      query: () => ({
        url: "/terms/retrive",
        method: "GET",
      }),
      providesTags: [tagTypes.terms],
    }),
    updateTermsConditions: builder.mutation({
      query: (data) => ({
        url: "/terms/create-or-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.terms],
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/about/retrive",
        method: "GET",
      }),
      providesTags: [tagTypes.about],
    }),
    updateAboutUs: builder.mutation({
      query: (data) => ({
        url: "/about/create-or-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.about],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} = settingsApis;
