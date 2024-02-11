import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const cardColorSlice = createSlice({
  name: "cardColor",
  initialState: {
    cardColor: "#ffffaa",
  },
  reducers: {
    setCardColor: (state, action: PayloadAction<string>) => {
      state.cardColor = action.payload;
    },
  },
});

export const { setCardColor } = cardColorSlice.actions;

export default cardColorSlice.reducer;
