import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Themes from "../../../themes/Themes";
import * as action from "../action/currentProfileActions";

const modalSlicer = createSlice({
  name: "modal",
  initialState: {
    theme: Themes.clasicTheme
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(action.switchTheme.fulfilled, (state, action: PayloadAction<{ status: number; data: any }>) => {
        state.theme =action.payload.data;
      })
    }
});
export default modalSlicer.reducer;