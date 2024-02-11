import { PropsSticky } from "@/app/Sticky";
import dummyNote from "@/app/utils/dummyNote";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface filterState {
  filters: PropsSticky[];
}

export const initialState: filterState = {
  filters: [dummyNote],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    initializeFilterState: (state) => {
      state.filters = initialState.filters;
    },
    setFilterGlobal: (state, action: PayloadAction<PropsSticky[]>) => {
      state.filters = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initializeFilterState, setFilterGlobal } = filterSlice.actions;

export default filterSlice.reducer;
