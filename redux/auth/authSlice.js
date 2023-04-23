import { createSlice } from "@reduxjs/toolkit";
import { signUp, signIn, isLoggedIn, logOut } from "./authOperations";

const initialState = {
  id: "",
  email: "",
  username: "",
  isAuth: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = true;
        state.email = payload.email;
        state.username = payload.displayName;
        state.id = payload.uid;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = true;
        state.email = payload.email;
        state.username = payload.displayName;
        state.id = payload.uid;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(isLoggedIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(isLoggedIn.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.isAuth = true;
        state.email = payload?.email;
        state.username = payload?.displayName;
      })
      .addCase(isLoggedIn.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(logOut.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const authReducer = authSlice.reducer;
