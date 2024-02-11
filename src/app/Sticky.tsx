"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Pass from "./components/Pass";
import Accept from "./components/Accept";
import Accept2 from "./components/Accept2";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFilterGlobal } from "@/lib/slices/filterSlice";

export interface PropsSticky {
  new: boolean;
  pin: boolean;
  fontStyle: string;
  fontSize: number;
  fontColor: string;
  align: string;
  tag: string[];
  cardColor: string;
  checked: boolean;
  createAt: number;
  editAt: number;
  content: string;
  id: string;
  md5: string;
}

export default function Sticky({ objectData }: { objectData: PropsSticky }) {
  const {
    pin,
    fontStyle,
    fontSize,
    fontColor,
    align,
    tag,
    cardColor,
    checked,
    createAt,
    editAt,
    content,
    id,
    md5,
  } = objectData;
  const router = useRouter();
  const notes = useAppSelector((state) => state.note_.notes);
  const dispatch = useAppDispatch();
  const handleByTag = (tag: string) => {
    dispatch(setFilterGlobal(notes.filter((i) => i.tag.includes(tag))));
    router.push("/filter/notes");
  };
  return (
    <div
      style={{ backgroundColor: cardColor }}
      className=" max-w-[450px] relative min-h-80 pt-14 px-5 pb-8 text-[1.2rem] top-0 left-0 w-full h-full shadow-[7px_10px_#00000055] border-[3px] border-black"
    >
      <Image
        onClick={() => router.push("/menu/" + id)}
        src={"/svg/pin.svg"}
        height={10}
        width={10}
        alt=""
        className=" w-12 absolute -top-2 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
      />
      <p
        className=" whitespace-pre-wrap"
        style={{
          color: fontColor,
          fontSize: `${fontSize}rem`,
          fontFamily: fontStyle ? fontStyle : "CuteThin",
          textAlign: align as any,
        }}
      >
        {content}
      </p>
      <div className=" flex gap-2 w-full px-5 flex-wrap-reverse leading-none p-5 absolute bottom-0 left-0">
        {tag.map((item, index) => (
          <button onClick={() => handleByTag(item)} key={index}>
            #{item}
          </button>
        ))}
      </div>
      {checked && (
        <div className=" absolute top-5 right-5 z-[15] w-60 h-60">
          <Accept2 />
        </div>
      )}
    </div>
  );
}
