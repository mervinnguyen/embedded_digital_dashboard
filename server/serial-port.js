// import { ReadlineParser, SerialPortMock } from "serialport";

// const path = "/dev/example";
// SerialPortMock.binding.createPort(path);
// const port = new SerialPortMock({ path, baudRate: 9600 });
// port.write("ROBOT POWER ON");
// const parser = new ReadlineParser();

// port.on("open", () => {
//   port.port.emitData("PORT ON");
// });

// port.pipe(parser);
// port.on("data", console.log);

// ----------------------------------------------------------------------

import { MockBinding } from "@serialport/binding-mock";
import { SerialPortStream } from "@serialport/stream";
import { ReadlineParser } from "@serialport/parser-readline";
import { useContext } from "react";
import DashContext from "../src/context/DashContext.js";

// Create a port and enable the echo and recording.
MockBinding.createPort("/dev/ROBOT", { echo: true, record: true });
const port = new SerialPortStream({
  binding: MockBinding,
  path: "/dev/ROBOT",
  baudRate: 14400,
});

const parseData = (line) => {
  const { setSpeed } = useContext(DashContext);
  const lines = line.split(" ");
  setSpeed(lines[1]);
};

// here we can parse the data incoming
// ex: "MPH 200 CHARGE 100"
const parser = new ReadlineParser();
port.pipe(parser).on("data", (line) => {
  console.log(line.toUpperCase());
  parseData(line);
});

// wait for port to open...
port.on("open", () => {
  // ...then test by simulating incoming data
  setInterval(() => {
    const newSpeed = Math.floor(Math.random() * 80);
    port.port.emitData(`MPH ${newSpeed} CHARGE 100\n`);
  }, 2000);
});

/* Expected output:
HELLO, WORLD!
*/

const WebSocket = require("ws");
const http = require("http");
const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

wss.on("listening", (socket) => {});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});

server.listen(3001, () => {
  console.log("WebSocket server is running on port 3001");
});
