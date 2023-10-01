import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AdminAuth"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      loginAdmin: builder.mutation<any, any>({
        query: (body) => ({
          url: "/auth/admin-login",
          method: "POST",
          body,
        }),
        invalidatesTags: ["AdminAuth"],
      }),
      registerAdmin: builder.mutation<any, any>({
        query: (body) => ({
          url: "/auth/admin-register",
          method: "POST",
          body,
        }),
        invalidatesTags: ["AdminAuth"],
      }),
    }),
  });

export const { useLoginAdminMutation, useRegisterAdminMutation } = adminApi;
