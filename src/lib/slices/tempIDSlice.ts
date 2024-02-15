import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const tempIDSlice = createSlice({
  name: "tempID",
  initialState: {
    tempID: "1",
  },
  reducers: {
    setTempID: (state, action: PayloadAction<string>) => {
      state.tempID = action.payload;
    },
  },
});

export const { setTempID } = tempIDSlice.actions;

export default tempIDSlice.reducer;
