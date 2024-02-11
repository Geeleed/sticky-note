import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCardColor } from "@/lib/slices/cardColorSlice";
import { RootState } from "@/lib/store";
import React, { useEffect, useRef, useState } from "react";
import Close from "./Close";

type Props = {
  setSelf: any;
  initColor: string;
};

export default function Color({ setSelf, initColor }: Props) {
  const notes = useAppSelector((state: RootState) => state.note_.notes);
  const dispatch = useAppDispatch();
  const [checkedValue, setCheckedValue] = useState<string>(initColor);
  const [colors, setColors] = useState<string[]>([
    "#ffffaa",
    "#ffc4aa",
    "#aaffb7",
    "#aaf1ff",
    "#ffaaaa",
  ]);
  const [colorCode, setColorCode] = useState<string>();
  const inputColorRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const init = Array.from(
      new Set([...colors, ...notes.map((item) => item.cardColor).sort()])
    );
    setColors(init);
  }, []);
  return (
    <div className=" absolute top-0 left-0 w-full h-full bg-[#ffffdd] flex flex-col items-center justify-start p-10">
      <h1 className=" text-[2rem] font-bold">เลือกสีกระดาษ</h1>
      <br />
      <section className=" grid grid-cols-3 gap-2 w-full h-80 overflow-y-auto p-3">
        {colors.map((item: any, index: number) => (
          <div
            style={{ backgroundColor: item }}
            key={index}
            className={
              (item === checkedValue
                ? " border-4 border-black shadow-[5px_5px_#00000088] -translate-x-1 -translate-y-1"
                : "") +
              " flex flex-col leading-none justify-center items-center text-[1.4rem] p-3 min-h-20 cursor-pointer"
            }
            onClick={() => {
              setCheckedValue(item);
              dispatch(setCardColor(item));
            }}
          >
            {item}
          </div>
        ))}
      </section>
      <br />
      <input
        className=" w-full border-4 h-10 my-2 border-black cursor-pointer"
        type="color"
        ref={inputColorRef}
        onChange={(e) => setColorCode(e.target.value)}
      />
      <button
        className=" text-[2rem] border-y-4 border-black border-double w-full p-1"
        onClick={() => {
          if (colorCode) {
            setColors((prev: any) => Array.from(new Set([...prev, colorCode])));
          }
        }}
      >
        เพิ่มสีใหม่
      </button>
      <button
        className=" text-[2rem] p-2"
        onClick={() => {
          sessionStorage.setItem("tempTag", JSON.stringify(checkedValue));
          setSelf(false);
        }}
      >
        {/* ปิด */}
        <Close />
      </button>
    </div>
  );
}

// const Picker = styled.div`
//   background-color: ${(props) => props.color || "#ffffaa"};
// `;
