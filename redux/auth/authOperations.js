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
      const { email, displayName, uid, photoURL } = auth.currentUser;

      return { email, displayName, uid, photoURL };
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
  "auth/isLoggedIn",
  async (_, { rejectWithValue }) => {
    try {
      let displayName;
      let email;
      let avatar;
      let id;
      await onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user);

        if (user) {
          displayName = user.displayName;
          email = user.email;
          avatar = user.photoURL;
          id = user.uid;
        }
      });
      if (!email) {
        return rejectWithValue("Error");
      }
      return { displayName, email, avatar, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
