"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PropsSticky } from "../Sticky";
import { setFilterGlobal } from "@/lib/slices/filterSlice";
import Back from "../components/Back";

type Props = {};

export default function Filter({}: Props) {
  const router = useRouter();
  const notes = useAppSelector((state) => state.note_.notes);
  const dispatch = useAppDispatch();
  const [filterTag, setFilterTag] = useState<string[]>([]);
  const [checkedTag, setCheckedTag] = useState<string[]>([]);
  const [filterColor, setFilterColor] = useState<string[]>([]);
  const [checkedColor, setCheckedColor] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>();
  const handleCheckedTag = (value: string) => {
    let temp = new Set([...checkedTag]);
    if (temp.has(value)) {
      temp.delete(value);
    } else {
      temp.add(value);
    }
    setCheckedTag(Array.from(temp));
  };
  const handleCheckedColor = (value: string) => {
    let temp = new Set([...checkedColor]);
    if (temp.has(value)) {
      temp.delete(value);
    } else {
      temp.add(value);
    }
    setCheckedColor(Array.from(temp));
  };
  const handleFilter = () => {
    let result: PropsSticky[];
    const step1 = notes
      .filter((i) =>
        checkedTag.length !== 0
          ? i.tag.some((j) => checkedTag.includes(j))
          : true
      )
      .filter((i) =>
        checkedColor.length !== 0 ? checkedColor.includes(i.cardColor) : true
      );
    result = step1;
    if (filterText) {
      result = step1.filter((i) => i.content.includes(filterText));
    }
    dispatch(setFilterGlobal(result));
    router.push("/filter/notes");
  };
  useEffect(() => {
    const allTag: string[] = Array.from(
      new Set(notes.flatMap((i) => i.tag))
    ).sort();
    const allColor = Array.from(new Set(notes.map((i) => i.cardColor))).sort();
    setFilterTag(allTag);
    setFilterColor(allColor);
  }, []);
  return (
    <div className=" absolute w-full h-full flex flex-col items-center bg-[#ffffdd] p-10 sm:max-w-lg left-1/2 -translate-x-1/2">
      <label className=" text-[2rem] font-bold">กรองโน็ต</label>
      <br />
      <section className=" w-full flex flex-col items-center gap-2 border-4 border-black shadow-[5px_5px_#00000088] p-2">
        {/* <label className=" text-[1.5rem]">เลือก tag</label> */}
        <div className=" grid grid-cols-3 gap-3 w-full ">
          {filterTag.map((item: any, index: number) => (
            <div
              key={index}
              className={
                (checkedTag.includes(item) &&
                  " border-4 border-black shadow-[5px_5px_#00000088_inset] bg-green-400") +
                " flex flex-col leading-none justify-center items-center text-[1.4rem] p-2 cursor-pointer"
              }
              onClick={() => handleCheckedTag(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </section>
      <br />
      <section className=" w-full flex flex-col items-center gap-2 border-4 border-black shadow-[5px_5px_#00000088]">
        {/* <label className=" text-[1.5rem]">เลือกสี</label> */}
        {/* {filterColor.map((item, index) => (
          <div key={index} style={{ backgroundColor: item }}>
            {item}
          </div>
        ))} */}
        <div className=" grid grid-cols-3 gap-2 w-full overflow-y-auto p-3 ">
          {filterColor.map((item: any, index: number) => (
            <div
              style={{ backgroundColor: item }}
              key={index}
              className={
                (checkedColor.includes(item) &&
                  " border-4 border-black shadow-[5px_5px_#00000088_inset] ") +
                " flex flex-col leading-none justify-center items-center text-[1.4rem] p-2 cursor-pointer"
              }
              onClick={() => {
                handleCheckedColor(item);
                //   dispatch(setCardColor(item));
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>
      <br />
      <section className=" w-full">
        <input
          className=" w-full p-2 border-4 border-black text-[1.3rem] outline-none shadow-[5px_5px_#00000088_inset]"
          onChange={(e) => setFilterText(e.target.value)}
          type="text"
          placeholder="ข้อความในโน็ต"
        />
      </section>
      <br />
      <button
        className=" text-[2rem] border-4 border-black w-full rounded-lg bg-[#ffffaa]"
        onClick={handleFilter}
      >
        เริ่มกรอง
      </button>
      <br />
      <Back />
    </div>
  );
}
