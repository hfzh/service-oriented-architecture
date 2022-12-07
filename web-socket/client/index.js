import { io } from "socket.io-client";

const PORT = 3000;
const socket = io(`ws://localhost:${PORT}`);

socket.on("ack", (args) => {
  socket.emit("client-ack", { data: "Data Retrieved Successfully" });
  console.log(args);
});
