"use client";
// import React, { useEffect, useRef, useState } from "react";

// type Props = {};

// export default function page({}: Props) {
//   const [text, setText] = useState("");
//   useEffect(() => {
//     document.getElementById("p")!.innerText = text;
//   }, [text]);
//   return (
//     <div>
//       <textarea onChange={(e) => setText(e.target.value)} cols={30} rows={10} />
//       <p id="p"></p>
//     </div>
//   );
// }

import React, { useState } from "react";

// Assuming you don't need Props for now, so it's left empty
type Props = {};

const Page: React.FC<Props> = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea onChange={(e) => setText(e.target.value)} cols={30} rows={10} />
      <p className=" whitespace-pre-wrap">{text}</p>{" "}
      {/* Directly render `text` state here */}
    </div>
  );
};

export default Page;
