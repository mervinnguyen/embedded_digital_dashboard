import React, { useState } from "react";
import DashContext from "./DashContext.js";

const DashProvider = ({ children }) => {
  const [energy, setEnergy] = useState(75); // 0 - 100
  const [IMD, setIMD] = useState(0); // 0 - off | 1 - good | 2 - error
  const [PCC, setPCC] = useState(0); // 0 - off | 1 - good | 2 - error
  const [amperage, setAmperage] = useState(60.4);
  const [voltage, setVoltage] = useState(100.1);
  const [speed, setSpeed] = useState(0); // 0 - 80
  const [accelerating, setAccelerating] = useState(false);

  return (
    <DashContext.Provider
      value={{
        energy,
        setEnergy,
        IMD,
        setIMD,
        PCC,
        setPCC,
        amperage,
        setAmperage,
        voltage,
        setVoltage,
        speed,
        setSpeed,
        accelerating,
        setAccelerating,
      }}
    >
      {children}
    </DashContext.Provider>
  );
};

export default DashProvider;
