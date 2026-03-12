const WebSocket = require("ws");
const http = require("http");
const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

let Gpio;
// Use pigpio-mock if running on macOS, otherwise use onoff
// changed to npm package supported with linux
if (process.platform !== "linux") {
  const pigpioMock = require("pigpio-mock");
  Gpio = pigpioMock.Gpio;
} else {
  Gpio = require("onoff").Gpio;
}
const gpioPin = new Gpio(17, "out");

wss.on("connection", (socket) => {
  // simulate speed updates
  let speed = 0;
  setInterval(() => {
    //   const speed = Math.floor(Math.random() * 100);
    speed += 5;
    speed %= 80;
    socket.send(JSON.stringify({ speed: speed }));
  }, 100);
  // replace with data coming from canbus
  // // send inital state
  // socket.send(JSON.stringify({ speed: gpioPin.digitalRead() }));
  // // listen to changes to GPIO
  // const speedListener = (value) => {
  //   socket.send(JSON.stringify({ speed: value }));
  // };
  // gpioPin.watch((err, value) => {
  //   if (err) {
  //     console.error("Error watching GPIO: ", err);
  //     return;
  //   }
  //   speedListener(value);
  // });
  // // remove GPIO listener when WS connection closes
  // socket.on("close", () => gpioPin.unwatch(speedListener));
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});

server.listen(3001, () => {
  console.log("WebSocket server is running on port 3001");
});
