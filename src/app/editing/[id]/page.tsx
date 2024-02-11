"use client";
import { PropsSticky } from "@/app/Sticky";
import NoteForm from "@/app/components/NoteForm";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const notes = useAppSelector((state: RootState) => state.note_.notes);
  const note: PropsSticky = notes.filter((n) => n.id === params.id)[0];
  return (
    // <div>
    //   <h1>Editing {params.id}</h1>
    //   <p>{notes.filter((item) => item.id === params.id)[0].content || ""}</p>
    // </div>
    <NoteForm sticky_note={note} />
  );
}
