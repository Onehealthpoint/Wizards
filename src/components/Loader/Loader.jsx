import load from "../Animation/Loading.json"
import Lottie from "lottie-react"
export const Loader = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <Lottie animationData={load} style={{ width: 200, height: 200 }} />
      </div>
    </>
  );
};
