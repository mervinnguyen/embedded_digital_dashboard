import { useContext } from "react";
import DashContext from "../context/DashContext.js";
import { motion } from "framer-motion";

const Speed = () => {
  const { speed } = useContext(DashContext);

  return (
    <div className="relative flex flex-col gap-5 border-solid border-4 rounded-full w-60 h-60 justify-center items-center">
      {/* inner ring */}
      <div className="absolute w-full h-full border-4 rounded-full border-gray-700" />
      <p className="absolute left-2 text-xs text-center z-10">0</p>
      <div className="bg-black absolute w-2 h-1 -left-1 z-1" />
      <p className="absolute left-[36px] top-[40px] text-xs text-center z-10">
        20
      </p>
      <div className="bg-black absolute w-3 h-1 rotate-45 left-[28px] top-[34px] z-1" />
      <p className="absolute left-[111px] top-[6px] text-xs text-center z-10">
        40
      </p>
      <div className="bg-black absolute w-1 h-2 left-[116px] -top-1 z-1" />
      <p className="absolute right-[36px] top-[40px] text-xs text-center z-10">
        60
      </p>
      <div className="bg-black absolute w-3 h-1 -rotate-45 right-[28px] top-[34px] z-1" />
      <p className="absolute right-2 text-xs text-center z-10">80</p>
      <div className="bg-black absolute w-2 h-1 -right-1 z-1" />
      <div className="w-full h-full">
        <motion.div
          className="needle drop-shadow-[0_0px_4px_#00FFF7] z-0"
          animate={{ rotate: (speed / 80) * 180 }}
        ></motion.div>
      </div>
      <div className="absolute flex flex-row items-end">
        <p className="text-6xl font-bold">{speed}</p>
        <p className="text-base">mph</p>
      </div>
    </div>
  );
};

export default Speed;
