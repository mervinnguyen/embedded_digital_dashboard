import { useContext, useEffect, useState } from "react";
import DashContext from "../context/DashContext.js";

export const useAccelerationEffect = () => {
  const { energy, setEnergy, speed, setSpeed, accelerating } =
    useContext(DashContext);

  useEffect(() => {
    let accelerationInterval;
    let decelerationInterval;

    const handleAcceleration = () => {
      setSpeed((prevSpeed) => Math.min(80, prevSpeed + 1));
      setEnergy((prevEnergy) => prevEnergy - 0.5);
    };

    const handleDeceleration = () => {
      setSpeed((prevSpeed) => Math.max(0, prevSpeed - 1));
      if (speed > 0) setEnergy((prevEnergy) => prevEnergy + 0.1);
    };

    if (accelerating && energy > 0) {
      accelerationInterval = setInterval(handleAcceleration, 50);
    } else {
      decelerationInterval = setInterval(handleDeceleration, 100);
    }

    return () => {
      clearInterval(accelerationInterval);
      clearInterval(decelerationInterval);
    };
  }, [energy, setEnergy, speed, setSpeed, accelerating]);
};

export const useKeyPressEffect = () => {
  const { setEnergy, setIMD, setPCC, setSpeed, setAccelerating } =
    useContext(DashContext);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "1") {
        setIMD((curr) => (curr + 1) % 3);
      } else if (e.key === "2") {
        setPCC((curr) => (curr + 1) % 3);
      } else if (e.key === "s") {
        setSpeed((curr) => Math.max(0, curr - 1));
      } else if (e.key === "c") {
        setEnergy((curr) => Math.min(100, curr + 1));
      }
    };

    const accelerate = (e) => {
      if (e.key === " ") setAccelerating(true);
    };

    const decelerate = (e) => {
      if (e.key === " ") setAccelerating(false);
    };

    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("keydown", accelerate);
    document.addEventListener("keyup", decelerate);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("keydown", accelerate);
      document.removeEventListener("keyup", decelerate);
    };
  }, [setEnergy, setIMD, setPCC, setSpeed, setAccelerating]);
};

export const CANBusWebSocket = () => {
  const { setSpeed } = useContext(DashContext);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001"); // Replace with your server WebSocket endpoint

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSpeed(data.speed);
    };

    // Cleanup WebSocket on component unmount
    return () => {
      socket.close();
    };
  }, [setSpeed]);
};

export const useSimulateAll = () => {
  const { setEnergy, setIMD, setPCC, setSpeed } = useContext(DashContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setIMD((curr) => (curr + 1) % 3);
    setPCC((curr) => (curr + 2) % 3);

    const toggleSpeed = () => {
      setEnergy((curr) => {
        if (curr === 0) return 100;
        else return curr - 1;
      });
      setSpeed((curr) => {
        if (curr === 80) return 0;
        else return curr + 1;
      });
    };

    let intervalId;
    if (active) {
      intervalId = setInterval(toggleSpeed, 80);
    }

    document.addEventListener("mouseup", handleKeyPress);
    return () => {
      document.removeEventListener("mouseup", handleKeyPress);
      clearInterval(intervalId);
    };
  }, [active, setIMD, setPCC, setEnergy, setSpeed]);

  const handleKeyPress = () => {
    setActive((curr) => !curr);
  };
};
