import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";
import { buildQueryParams } from "@/lib/utils";

const faqApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaqs: builder.query({
      query: (query) => {
        const params = buildQueryParams(query);
        return {
          url: "/faq/allFaq",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.faq],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create-faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/update-faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useGetAllFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApis;
