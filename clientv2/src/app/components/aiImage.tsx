"use client";
import createImg from "@/Utils/image";

export default function AiImage() {
  return (
    <button
      onClick={() => {
        createImg();
      }}
    >
      {" "}
      Create Avatar
    </button>
  );
}
