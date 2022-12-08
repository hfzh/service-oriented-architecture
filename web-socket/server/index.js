import { Server } from "socket.io";

const PORT = 3000;

const io = new Server(PORT);

let [, , name] = process.argv;
name = name ?? "Client";

io.on("connection", (socket) => {
  console.log(`Server connected on port ${PORT}`);
  socket.emit("ack", { msg: `Hello, ${name}!` });
  socket.on("client-ack", (args) => {
    console.log(args);
  });
});
