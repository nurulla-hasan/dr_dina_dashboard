import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";
import { buildQueryParams } from "@/lib/utils";


const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: (query) => {
        const params = buildQueryParams(query);
        return {
          url: "/notification/my-notifications",
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.notification],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notification/mark-as-read/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/notification/mark-as-read",
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi;
