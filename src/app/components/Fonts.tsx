import { useAppDispatch } from "@/lib/hooks";
import { setFont } from "@/lib/slices/fontSlice";
import React from "react";
import Back from "./Back";
import Close from "./Close";

type Props = {
  setSelf: any;
};

export default function Fonts({ setSelf }: Props) {
  const dispatch = useAppDispatch();
  const btnCSS =
    "hover:bg-yellow-300 border-double border-black border-y-4 flex items-center justify-center w-full p-2 text-[2rem] cursor-pointer";
  const handleSelect = (font: string) => {
    dispatch(setFont(font));
    setSelf(null);
  };
  return (
    <div className=" absolute top-0 left-0 w-full h-full bg-[#ffffaa] flex flex-col items-center gap-5 p-10">
      <h1 className=" text-[2rem] font-bold">เลือกฟอนต์</h1>
      <h1
        onClick={() => handleSelect("CuteThin")}
        className={btnCSS + " font-[CuteThin]"}
      >
        ภาษาไทย English
      </h1>
      <h1
        onClick={() => handleSelect("MNPancake")}
        className={btnCSS + " font-[MNPancake]"}
      >
        ภาษาไทย English
      </h1>
      <h1
        onClick={() => handleSelect("MNYaHom")}
        className={btnCSS + " font-[MNYaHom]"}
      >
        ภาษาไทย English
      </h1>
      <h1
        onClick={() => handleSelect("RocketThin")}
        className={btnCSS + " font-[RocketThin]"}
      >
        ภาษาไทย English
      </h1>
      <h1
        onClick={() => handleSelect("Scriphy")}
        className={btnCSS + " font-[Scriphy]"}
      >
        ภาษาไทย English
      </h1>
      <button
        className=" text-[2rem] cursor-pointer"
        onClick={() => setSelf(null)}
      >
        {/* ปิด */}
        <Close />
      </button>
    </div>
  );
}
