import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as action from "../action/currentProfileActions";

interface CurrentProfileState {
  data: any;
  bookmarks: any;
  loading: boolean;
  errors: any;
}

const initialState: CurrentProfileState = {
  data: null,
  bookmarks: null,
  loading: false,
  errors: null,
};

export const currentProfileSlicer = createSlice({
  name: "currentProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(action.signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(action.signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(action.getCurrentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(action.signUp.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status, data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
        state.loading = false;
      })
      .addCase(action.signIn.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status, data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
        state.loading = false;
      })
      .addCase(action.signOut.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status } = action.payload;
        if (status === 200) {
          state.data = null;
        }
      })
      .addCase(action.getCurrentProfile.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status,data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
        state.loading = false;
      })
      .addCase(action.getGroups.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status,data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
      })
      .addCase(action.addBookmark.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status,data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
      })
      .addCase(action.removeBookmark.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status,data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
      })
      .addCase(action.editProfile.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status,data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
      })
      .addCase(action.uploadAvatar.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status,data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
      })
      .addCase(action.getPostsPage.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        const { status,data } = action.payload;
        if (status === 200) {
          state.data = data;
        }
      });
  },
});
export default currentProfileSlicer.reducer;