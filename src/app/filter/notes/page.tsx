"use client";
import Sticky, { PropsSticky } from "@/app/Sticky";
import Back from "@/app/components/Back";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  const notes = useAppSelector((state) => state.filter_.filters);
  return (
    <div className=" p-5">
      <button className=" fixed bottom-5 right-5 z-20">
        <Back />
      </button>

      <div className=" flex flex-col gap-5 sm:flex-row flex-wrap justify-center ">
        {notes?.map((i: PropsSticky, inx: number) => (
          <Sticky key={inx} objectData={i} />
        ))}
      </div>
    </div>
  );
}
