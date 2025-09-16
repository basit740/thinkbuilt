import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Reviews", "Images", "Blogs", "Projects"],
  endpoints: () => ({}),
});

// Export the apiSlice for use in other files
export default apiSlice;