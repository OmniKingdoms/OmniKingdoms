"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Trains() {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleButtonClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="btn  normal-case absolute top-[65%] left-[25%] overflow-hidden rounded-lg px-12 py-6 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-2"
      >
        <span className="absolute inset-px z-10 grid place-items-center rounded-lg bg-primary bg-gradient-to-t from-neutral-800 text-white">
          Train
        </span>
        <span
          aria-hidden
          className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
        />
      </button>
      <AnimatePresence initial={false} mode={"wait"}>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[40%] left-[40%] bg-white rounded-lg p-4 shadow-md"
          >
            <p>Zoomed in component</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
