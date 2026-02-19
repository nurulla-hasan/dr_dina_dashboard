import { baseApi } from "../../feature/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: (year) => ({
        url: "/dashboard/stats",
        method: "GET",
        params: { year },
      }),
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
