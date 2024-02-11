import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const sizeSlice = createSlice({
  name: "size",
  initialState: {
    size: 3,
  },
  reducers: {
    initSize: (state) => {
      state.size;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    upSize: (state) => {
      state.size += 0.2;
    },
    downSize: (state) => {
      state.size -= 0.2;
    },
  },
});

export const { setSize, upSize, downSize } = sizeSlice.actions;

export default sizeSlice.reducer;
