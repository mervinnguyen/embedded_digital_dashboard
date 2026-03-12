import "./App.css";
import Header from "./components/header.js";
import Speed from "./components/speed.js";
import Footer from "./components/footer.js";
import {
  // useAccelerationEffect,
  // useKeyPressEffect,
  // CANBusWebSocket,
  useSimulateAll,
} from "./hooks/effects.js";

const App = () => {
  // useAccelerationEffect();
  // useKeyPressEffect();
  // CANBusWebSocket();
  useSimulateAll();

  return (
    <div className="flex flex-col justify-between items-center text-center w-[800px] h-[480px] p-10 bg-black text-white ">
      <Header />
      <Speed />
      <Footer />
    </div>
  );
};

export default App;

// -----------------------------------------------------------------

// import React, { useState, useEffect } from "react";

// function App() {
//   const [gpioState, setGpioState] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       fetch("http://localhost:3001/api/gpio-state")
//         .then((response) => response.json())
//         .then((data) => {
//           setGpioState(data.state);
//           console.log(data.state);
//         })
//         .catch((error) => console.error("Error fetching GPIO state:", error));
//     };

//     const intervalId = setInterval(() => {
//       fetchData();
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div>
//       <h1>GPIO State: {gpioState}</h1>
//     </div>
//   );
// }

// export default App;

// -----------------------------------------------------------------

// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [speed, setSpeed] = useState(null);

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:3001"); // Replace with your server WebSocket endpoint

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setSpeed(data.speed);
//     };

//     // Cleanup WebSocket on component unmount
//     return () => {
//       socket.close();
//     };
//   }, []);

//   return <div>{speed !== null && <p>Speed: {speed} km/h</p>}</div>;
// };

// export default App;
