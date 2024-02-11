import { PropsSticky } from "@/app/Sticky";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import package_json from "./../../../package.json";

export interface NoteState {
  notes: PropsSticky[];
}

export const initialState: NoteState = {
  notes: [
    {
      new: false,
      pin: false,
      fontStyle: "CuteThin",
      fontSize: 2,
      fontColor: "#000000",
      align: "center",
      tag: [],
      cardColor: "#ffffaa",
      checked: false,
      createAt: 1,
      editAt: 1,
      content: `Sticky note ยินดีต้อนรับ 😊 จิ้มที่หมุดแล้วเริ่มเลย!`,
      id: "1",
      md5: "1",
    },
    {
      new: false,
      pin: false,
      fontStyle: "Scriphy",
      fontSize: 3,
      fontColor: "#000000",
      align: "center",
      tag: [],
      cardColor: "#aaffaa",
      checked: false,
      createAt: 1,
      editAt: 1,
      content: `Sticky note v.${package_json.version} Dev by Geeleed`,
      id: "2",
      md5: "2",
    },
    {
      new: false,
      pin: false,
      fontStyle: "CuteThin",
      fontSize: 1.6,
      fontColor: "#000000",
      align: "center",
      tag: [],
      cardColor: "#ffc4aa",
      checked: false,
      createAt: 1,
      editAt: 1,
      content: `source: https://github.com/Geeleed/sticky-note`,
      id: "3",
      md5: "3",
    },
  ],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    initializeState: (state) => {
      state.notes = initialState.notes;
    },
    readStorage: (state) => {
      state.notes = JSON.parse(localStorage.getItem("notes") as string) || [];
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((item) => item.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    addNote: (state, action: PayloadAction<PropsSticky>) => {
      state.notes = [action.payload, ...state.notes];
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    editNote: (state, action: PayloadAction<PropsSticky>) => {
      state.notes = state.notes.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        else return item;
      });
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    checkedNote: (
      state,
      action: PayloadAction<{ id: string; isChecked: boolean }>
    ) => {
      const index = state.notes.findIndex(
        (item) => item.id == action.payload.id
      );
      state.notes[index].checked = action.payload.isChecked;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initializeState,
  readStorage,
  deleteNote,
  addNote,
  editNote,
  checkedNote,
} = noteSlice.actions;

export default noteSlice.reducer;
