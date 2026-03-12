import { useContext } from "react";
import DashContext from "../context/DashContext.js";
import { TiBatteryHigh } from "react-icons/ti";
import { motion } from "framer-motion";

const Footer = () => {
  const { energy, voltage } = useContext(DashContext);

  return (
    <div className="flex flex-col justify-between w-fit">
      {/* energy bar */}
      <div className="w-80 h-1 bg-[#00FFF7] bg-opacity-20 rounded-lg">
        <motion.div
          className="h-1 bg-[#00FFF7] drop-shadow-[0_0px_8px_#00FFF7] shadow-cyan-400 rounded-lg"
          animate={{
            width: `${(energy / 100) * 320}px`,
          }}
        ></motion.div>
      </div>
      {/* status numbers */}
      <div className="flex flex-row justify-between py-1">
        <div className="flex flex-row justify-center items-center gap-1">
          <TiBatteryHigh size={24} color="white" />
          <p>{Math.ceil(energy)}%</p>
        </div>
        <p>{voltage} V</p>
      </div>
    </div>
  );
};

export default Footer;
