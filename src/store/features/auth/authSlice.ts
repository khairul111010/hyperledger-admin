import { createSlice } from "@reduxjs/toolkit";
export enum authEnum {
  AUTH_LOCAL_STORAGE_KEY = "auth-key",
}
export interface AuthState {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  accessToken: string | null; // jwt token
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem(
        authEnum.AUTH_LOCAL_STORAGE_KEY,
        action.payload.accessToken
      );
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    userLoggedOut: () => {
      localStorage.removeItem(authEnum.AUTH_LOCAL_STORAGE_KEY);
      return initialState;
    },
  },
});

export const { userLoggedIn, updateUser, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
