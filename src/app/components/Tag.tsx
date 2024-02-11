import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTag } from "@/lib/slices/tagSlice";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import Close from "./Close";

type Props = {
  setSelf: any;
  initTags: string[] | undefined;
};

export default function Tag({ setSelf, initTags }: Props) {
  const notes = useAppSelector((state: RootState) => state.note_.notes);
  const dispatch = useAppDispatch();
  const [checkedValue, setCheckedValue] = useState(initTags as string[]);
  const [tags, setTags] = useState<string[]>([
    "งานด่วน",
    "ได้ตังค์",
    "งานฟรี",
    "สิ่งที่ต้องทำ",
    "งานอดิเรก",
  ]);
  const handleChecked = (value: string) => {
    let temp = new Set([...checkedValue]);
    if (temp.has(value)) {
      temp.delete(value);
    } else {
      temp.add(value);
    }
    setCheckedValue(Array.from(temp));
  };
  useEffect(() => {
    const initTags = Array.from(
      new Set([
        ...tags,
        ...notes
          .filter((item) => item.tag.length !== 0)
          .flatMap((item) => item.tag)
          .sort(),
      ])
    );
    setTags(initTags);
  }, []);
  return (
    <div className=" absolute top-0 left-0 w-full h-full bg-[#ffffdd] flex flex-col items-center justify-start p-10">
      <h1 className=" text-[2rem] font-bold">เลือก tag</h1>
      <br />
      <section className=" grid grid-cols-3 gap-3 w-full">
        {tags.map((item: any, index: number) => (
          <div
            key={index}
            className={
              (checkedValue.includes(item) &&
                " border-4 border-black shadow-[5px_5px_#00000088] bg-green-400") +
              " flex flex-col leading-none justify-center items-center text-[1.4rem] p-2 cursor-pointer"
            }
            onClick={() => handleChecked(item)}
          >
            {item}
          </div>
        ))}
      </section>
      <br />
      <button
        className=" text-[2rem] border-y-4 border-black border-double w-full p-1"
        onClick={() => {
          const tagName = prompt("ตั้งชื่อ tag");
          if (tagName) {
            setTags((prev: any) => [...prev, tagName]);
          }
        }}
      >
        เพิ่ม tag ใหม่
      </button>
      <button
        className=" text-[2rem] p-2"
        onClick={() => {
          dispatch(setTag(checkedValue));
          setSelf(false);
        }}
      >
        {/* ปิด */}
        <Close />
      </button>
    </div>
  );
}
