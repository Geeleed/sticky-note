import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fontColorSlice = createSlice({
  name: "fontColor",
  initialState: {
    fontColor: "#000000",
  },
  reducers: {
    setFontColor: (state, action: PayloadAction<string>) => {
      state.fontColor = action.payload;
    },
  },
});

export const { setFontColor } = fontColorSlice.actions;

export default fontColorSlice.reducer;
