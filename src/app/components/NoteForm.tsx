"use client";
import React, { useEffect, useRef, useState } from "react";
import Tag from "./Tag";
import Color from "./Color";
import Fonts from "./Fonts";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { downSize, setSize, upSize } from "@/lib/slices/sizeSlice";
import { setFontColor } from "@/lib/slices/fontColorSlice";
import { md5 } from "../utils/md5";
import { addNote, editNote } from "@/lib/slices/noteSlice";
import { worldTime } from "../utils/worldTime";
import { PropsSticky } from "../Sticky";
import { setFont } from "@/lib/slices/fontSlice";
import { setTag } from "@/lib/slices/tagSlice";
import { setCardColor } from "@/lib/slices/cardColorSlice";
import { setAlign } from "@/lib/slices/alignSlice";

type Props = {
  sticky_note: PropsSticky;
};

export default function NoteForm({ sticky_note }: Props) {
  const notes = useAppSelector((state) => state.note_.notes);
  let old: PropsSticky;
  if (!sticky_note.new) {
    old = notes.filter((item) => item.id === sticky_note.id)[0];
  }
  const fontSelected = useAppSelector((state) => state.font_.font);
  const fontSize = useAppSelector((state) => state.size_.size);
  const fontColor = useAppSelector((state) => state.fontColor_.fontColor);
  const taged = useAppSelector((state) => state.tag_.tag);
  const cardColor = useAppSelector((state) => state.cardColor_.cardColor);
  const align = useAppSelector((state) => state.align_.align);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [popupFonts, setPopupFonts] = useState<any>(null);
  const [popupTag, setPopupTag] = useState<boolean>(false);
  const [popupColor, setPopupColor] = useState<any>(null);
  const [iconAlign, setIconAlign] = useState<any>();
  const handleAlign = (set: boolean = false) => {
    switch (set ? sticky_note.align : align) {
      case set ? "center" : "left":
        dispatch(setAlign("center"));
        setIconAlign(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
        );
        break;
      case set ? "right" : "center":
        dispatch(setAlign("right"));
        setIconAlign(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        );
        break;
      case set ? "left" : "right":
        dispatch(setAlign("left"));
        setIconAlign(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        );
        break;

      default:
        break;
    }
  };
  const handleSave = () => {
    const now = worldTime();
    const note: PropsSticky = {
      new: false,
      pin: false,
      fontStyle: fontSelected,
      fontSize: fontSize,
      fontColor: fontColor,
      align: align,
      tag: taged,
      cardColor: cardColor,
      checked: false,
      createAt: now,
      editAt: now,
      content: textareaRef.current?.value as string,
      id: "",
      md5: "",
    };
    note.id = md5(JSON.stringify(note));
    note.md5 = md5(JSON.stringify(note));
    dispatch(addNote(note));
    router.push("/");
  };
  const handleEdit = () => {
    const note: PropsSticky = {
      new: false,
      pin: false,
      fontStyle: fontSelected,
      fontSize: fontSize,
      fontColor: fontColor,
      align: align,
      tag: taged,
      cardColor: cardColor,
      checked: false,
      createAt: old.createAt,
      editAt: worldTime(),
      content: textareaRef.current?.value as string,
      id: old.id,
      md5: old.md5,
    };
    note.md5 = md5(JSON.stringify(note));
    dispatch(editNote(note));
    router.push("/");
  };
  const btnCSS =
    " rounded-full flex justify-center items-center w-14 h-14 cursor-pointer";
  const btnCSS2 =
    " w-12 h-12 border-2 shadow-[5px_5px_#00000088] border-black cursor-pointer flex justify-center items-center";
  useEffect(() => {
    dispatch(setFontColor("#000"));
    handleAlign(true);
  }, []);
  useEffect(() => {
    if (sticky_note) {
      dispatch(setFont(sticky_note.fontStyle));
      dispatch(setSize(sticky_note.fontSize));
      dispatch(setFontColor(sticky_note.fontColor));
      dispatch(setTag(sticky_note.tag));
      dispatch(setCardColor(sticky_note.cardColor));
      dispatch(setAlign(sticky_note.align));
      textareaRef.current!.value = sticky_note.content;
    }
  }, []);
  return (
    <div className=" absolute w-full h-full px-5 pb-10 bg-[#ffffdd] sm:max-w-lg left-1/2 -translate-x-1/2">
      <div className=" flex justify-end gap-2 text-[1.4rem] items-center py-3">
        <button
          className={btnCSS2}
          onClick={() => setPopupFonts(<Fonts setSelf={setPopupFonts} />)}
        >
          Font
        </button>
        <button className={btnCSS2} onClick={() => dispatch(upSize())}>
          {/* Size+ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 18.75 7.5-7.5 7.5 7.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button className={btnCSS2} onClick={() => dispatch(downSize())}>
          {/* Size- */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
        </button>
        <button className={btnCSS2} onClick={() => handleAlign()}>
          {/* Align */}
          {iconAlign}
        </button>
        <input
          className={btnCSS2}
          onChange={(e) => dispatch(setFontColor(e.target.value))}
          type="color"
          value={fontColor}
        />
      </div>
      <section
        style={{
          backgroundColor: cardColor,
        }}
        className=" flex flex-col w-full h-[60%] bg-yellow-400 shadow-[5px_5px_#00000088] border-4 border-black text-[1.3rem]"
      >
        <div className=" h-10% flex justify-end">
          <button className={btnCSS} onClick={() => setPopupTag(true)}>
            {/* #Tag */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
              />
            </svg>
          </button>
          <button className={btnCSS} onClick={() => setPopupColor(true)}>
            {/* Color */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
              />
            </svg>
          </button>
          <button
            className={btnCSS}
            onClick={() => {
              sticky_note.new ? handleSave() : handleEdit();
            }}
          >
            {/* {sticky_note ? "Update" : "Save"} */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
          <button className={btnCSS} onClick={() => router.back()}>
            {/* Close */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <textarea
          ref={textareaRef}
          style={{
            fontSize: `${fontSize.toFixed(1)}rem`,
            fontFamily: fontSelected,
            color: fontColor,
            backgroundColor: cardColor,
            textAlign: align as any,
          }}
          className=" relative w-full h-[80%] bg-yellow-400 outline-none px-5"
        />
        <div className=" flex flex-wrap-reverse gap-2 w-full p-5 leading-none">
          {taged.map((item, index) => (
            <button key={index}>#{item}</button>
          ))}
        </div>
      </section>
      <div className={popupTag ? "block" : "hidden"}>
        <Tag
          setSelf={setPopupTag}
          initTags={sticky_note ? sticky_note.tag : []}
        />
      </div>
      <div className={popupColor ? "block" : "hidden"}>
        <Color
          setSelf={setPopupColor}
          initColor={sticky_note ? sticky_note.cardColor : "#ffffaa"}
        />
      </div>
      {popupFonts}
    </div>
  );
}
