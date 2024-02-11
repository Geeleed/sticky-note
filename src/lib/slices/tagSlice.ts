import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tag: [],
  },
  reducers: {
    setTag: (state: any, action: PayloadAction<string[]>) => {
      state.tag = action.payload;
    },
  },
});

export const { setTag } = tagSlice.actions;

export default tagSlice.reducer;
