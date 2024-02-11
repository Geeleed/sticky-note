"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function Back({}: Props) {
  const router = useRouter();
  return (
    <svg
      onClick={() => router.back()}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10 border-4 border-black bg-[#ffffaa] shadow-[3px_3px_#00000088] p-1 rounded-full cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>
  );
}
