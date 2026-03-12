const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
let Gpio;

// Use pigpio-mock if running on macOS, otherwise use onoff
if (process.platform === "darwin") {
  const pigpioMock = require("pigpio-mock");
  Gpio = pigpioMock.Gpio;
} else {
  Gpio = require("onoff").Gpio;
}

const gpioPin = new Gpio(17, "out");

app.get("/api/gpio-state", (req, res) => {
  const state = gpioPin.digitalRead();
  res.json({ state });
});

// digitalWrite for mock | writeSync for onoff
app.post("/api/set-gpio-state/:state", async (req, res) => {
  const newState = parseInt(req.params.state, 10);
  gpioPin.digitalWrite(newState);

  // Use a timeout to simulate an asynchronous state change
  //   setTimeout(() => {
  //     gpioPin.writeSync(newState, (err) => {
  //       if (err) {
  //         console.error(err);
  //         res.json({ success: false, error: err.message });
  //       } else {
  //         res.json({ success: true, newState });
  //       }
  //     });
  //   }, 0);
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
