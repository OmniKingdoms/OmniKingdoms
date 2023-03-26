import { useWaitForTransaction } from "wagmi";
import { motion } from "framer-motion";

export function Success() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 5 }}
      className="absolute top-10 right-0 bottom-0  rounded-md shadow"
    >
      <p className=" bg-green-600 p-2 text-slate-100 rounded-lg ">
        Transaction Success.
      </p>
    </motion.div>
  );
}
export function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute top-10 right-0 bottom-0  rounded-md shadow"
    >
      <p className=" bg-gray-600 p-2 text-slate-100 rounded-lg ">
        Transaction Pending.
      </p>
    </motion.div>
  );
}
export default function Toast({ hash }: any) {
  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash,
  });

  return <>{isSuccess ? <Success /> : <Loading />}</>;
}
