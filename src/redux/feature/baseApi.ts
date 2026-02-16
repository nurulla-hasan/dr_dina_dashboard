import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";

// Define a basic RootState structure to avoid circular dependency with store.ts
interface RootState {
  auth: {
    accessToken: string | null;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1", // Replace with your actual API base URL
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
