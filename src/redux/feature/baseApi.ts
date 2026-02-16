import {
  type BaseQueryApi,
  createApi,
  type FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import { jwtDecode } from "jwt-decode";
import { Logout, SetUser } from "./auth/authSlice";
import type { TDecodedToken } from "../../types/global.types";

// Define a basic RootState structure to avoid circular dependency with store.ts
interface RootState {
  auth: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

// Define the structure of the refresh token response
interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.20.34:5000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  const state = api.getState() as RootState;
  const accessToken = state.auth.accessToken;

  // If token is expired or about to expire (within 30s)
  if (accessToken) {
    const decoded = jwtDecode<TDecodedToken>(accessToken);
    const currentTime = Date.now() / 1000;
    const isExpired = decoded.exp < currentTime + 30; // 30s buffer

    if (isExpired) {
      // Try to get new token
      const refreshToken = state.auth.refreshToken;
      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult?.data) {
          const data = (refreshResult.data as RefreshTokenResponse).data;
          const newAccessToken = data.accessToken;
          // Refresh token might not be returned in refresh endpoint, keep the old one
          const newRefreshToken = data.refreshToken || refreshToken;

          if (newAccessToken) {
            api.dispatch(
              SetUser({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              })
            );
            // Retry the original query with new token
            result = await baseQuery(args, api, extraOptions);
          }
        } else {
          // Refresh failed - logout user
          api.dispatch(Logout());
        }
      } else {
        // No refresh token available - logout
        api.dispatch(Logout());
      }
    }
  }

  // Also handle 401 from backend
  if (result.error && result.error.status === 401) {
    // Try to get new token
    const refreshToken = state.auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const data = (refreshResult.data as RefreshTokenResponse).data;
        const newAccessToken = data.accessToken;
        // Refresh token might not be returned in refresh endpoint, keep the old one
        const newRefreshToken = data.refreshToken || refreshToken;

        if (newAccessToken) {
          api.dispatch(
            SetUser({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            })
          );
          // Retry the original query with new token
          result = await baseQuery(args, api, extraOptions);
        }
      } else {
        // Refresh failed - logout user
        api.dispatch(Logout());
      }
    } else {
      api.dispatch(Logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
