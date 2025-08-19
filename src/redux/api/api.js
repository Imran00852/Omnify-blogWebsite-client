import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
  }),
  tagTypes: ["POST"],
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs/new",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["POST"],
    }),
    updateBlog: builder.mutation({
      query: ({ data, id }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["POST"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["POST"],
    }),
    getAllBlogs: builder.query({
      query: ({ page = 1, limit = 6 }) => ({
        url: `/blogs/all?page=${page}&limit=${limit}`,
      }),
      providesTags: ["POST"],
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
      }),
      providesTags: ["POST"],
    }),
  }),
});

export default api;

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
} = api;
