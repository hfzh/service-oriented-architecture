import { io } from "socket.io-client";

const PORT = 3000;

let [, , name] = process.argv;
name = name ?? "Server";

const socket = io(`ws://localhost:${PORT}`);
socket.on("ack", (args) => {
  console.log(`Client connected on port ${PORT}`);
  socket.emit("client-ack", { msg: `Hy, ${name}!` });
  console.log(args);
});
