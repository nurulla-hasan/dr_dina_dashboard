import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";
import { buildQueryParams } from "@/lib/utils";

const userApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllUsers: builder.query({
      query: (query) => {
        const params = buildQueryParams(query);
        return {
          url: "/user/all",
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.user],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/single/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/block-user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    
  }),
});

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userApis;
