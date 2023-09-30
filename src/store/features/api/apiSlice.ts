import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { authEnum } from "modules/auth/core/enums";
import { authEnum, userLoggedOut } from "../auth/authSlice";
// import { apiURL } from "../../utils/defaults";
// import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }: any) => {
    const accessToken = localStorage.getItem(authEnum.AUTH_LOCAL_STORAGE_KEY);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    const selectedOrganization = getState().organizations.selectedOrganization;
    if (selectedOrganization) {
      headers.set("organization", `${selectedOrganization.id}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
    }
    return result;
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});
