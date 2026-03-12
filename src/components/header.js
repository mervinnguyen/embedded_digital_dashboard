import { useContext } from "react";
import DashContext from "../context/DashContext.js";

const Header = () => {
  const { IMD, PCC, amperage } = useContext(DashContext);

  return (
    <div className="flex flex-row justify-between items-center w-fit gap-8">
      <div className="flex flex-row justify-center items-center gap-2">
        <p className="font-semibold">IMD</p>
        <div
          className={`w-2 h-2 rounded-full ${
            IMD === 0
              ? "bg-gray-600"
              : IMD === 1
              ? "bg-green-500"
              : "bg-red-600"
          }`}
        ></div>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <p className="font-semibold">PCC</p>
        <div
          className={`w-2 h-2 rounded-full ${
            PCC === 0
              ? "bg-gray-600"
              : PCC === 1
              ? "bg-green-500"
              : "bg-red-600"
          }`}
        ></div>
      </div>
      <div>
        <p className="font-semibold">{amperage} A</p>
      </div>
    </div>
  );
};

export default Header;
