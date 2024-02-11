"use client";
import React, { useEffect } from "react";
import Sticky, { PropsSticky } from "./Sticky";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { readStorage } from "@/lib/slices/noteSlice";

type Props = {};

export default function page({}: Props) {
  let notes = useAppSelector((state: RootState) => state.note_.notes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("notes") !== null) dispatch(readStorage());
  }, []);

  return (
    <div>
      <div className=" flex flex-col gap-5 p-5 sm:flex-row sm:gap-10 flex-wrap justify-center">
        {notes?.map((i: PropsSticky, inx: number) => (
          <Sticky key={inx} objectData={i} />
        ))}
      </div>
    </div>
  );
}
