import React from "react";
import NoteForm from "../components/NoteForm";
import dummyNote from "../utils/dummyNote";

type Props = {};

export default function page({}: Props) {
  return <NoteForm sticky_note={dummyNote} />;
}
