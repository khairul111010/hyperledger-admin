import { createSlice } from "@reduxjs/toolkit";
export enum authEnum {
  AUTH_LOCAL_STORAGE_KEY = "auth-key",
}
export interface AuthState {
  user: {
    id: number | null;
    name: string | null;
    email: string | null;
  };
  accessToken: string | null; // jwt token
}

const initialState: AuthState = {
  user: {
    id: null,
    name: null,
    email: null,
  },
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      console.log("payload", action.payload);

      state.accessToken = action.payload.token;
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      localStorage.setItem(
        authEnum.AUTH_LOCAL_STORAGE_KEY,
        action.payload.token
      );
    },
    userLoggedOut: () => {
      localStorage.removeItem(authEnum.AUTH_LOCAL_STORAGE_KEY);
      return initialState;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
