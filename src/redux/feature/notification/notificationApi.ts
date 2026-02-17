import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";


const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: () => ({
        url: "/notification/my-notifications",
        method: "GET",
      }),
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
