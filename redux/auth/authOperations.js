import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.username,
      });
      const { email, displayName, uid } = auth.currentUser;

      return { email, displayName, uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      const { email, displayName, uid } = auth.currentUser;
      return { email, displayName, uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const isLoggedIn = createAsyncThunk(
  "auth/isAuth",
  async (_, { rejectWithValue }) => {
    try {
      onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user);
        if (user) {
          const data = {
            displayName: user.displayName,
            email: user.email,
          };

          return data;
        }
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
