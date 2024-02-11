import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const alignSlice = createSlice({
  name: "align",
  initialState: {
    align: "left",
  },
  reducers: {
    setAlign: (state, action: PayloadAction<string>) => {
      state.align = action.payload;
    },
  },
});

export const { setAlign } = alignSlice.actions;

export default alignSlice.reducer;
