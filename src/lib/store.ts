import { configureStore } from "@reduxjs/toolkit";
// import { initializeState } from "./slices/noteSlice";
import noteReducers from "@/lib/slices/noteSlice";
import fontReducers from "./slices/fontSlice";
import sizeReducers from "./slices/sizeSlice";
import cardColorReducers from "./slices/cardColorSlice";
import fontColorReducers from "./slices/fontColorSlice";
import tagReducers from "./slices/tagSlice";
import alignReducers from "./slices/alignSlice";
import filterReducers from "./slices/filterSlice";
import tempIDReducers from "./slices/tempIDSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      note_: noteReducers,
      font_: fontReducers,
      size_: sizeReducers,
      cardColor_: cardColorReducers,
      fontColor_: fontColorReducers,
      tag_: tagReducers,
      align_: alignReducers,
      filter_: filterReducers,
      tempID_: tempIDReducers,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
