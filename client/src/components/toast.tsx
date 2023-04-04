import { useWaitForTransaction } from "wagmi";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast({ hash }: any) {
  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash,
  });
  if (isError) {
    toast.error(data as any, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  if (isLoading) {
    console.log("render");
    toast.info("approving tx: " + hash, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  if (isSuccess) {
    console.log("render");

    toast.success("success:" + hash, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  return <ToastContainer />;
}
