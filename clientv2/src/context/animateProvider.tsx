"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Client wraps any client/rsc components with AnimatePresence
export default function Client({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div key={pathname} initial={{}} animate={{}} exit={{}}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
