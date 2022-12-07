import { Server, Socket } from "socket.io";

const data = [
  {
    nama: "Hafizh Abid Wibowo",
    nrp: "5027201011",
  },
  {
    nama: "Muhammad Naufal Pasya",
    nrp: "5027201045",
  },
  {
    nama: "Mutiara Nuraisyah Dinda Rifliansah",
    nrp: "5027201054",
  },
];

const io = new Server(3000);

io.on("connection", (socket) => {
  socket.emit("ack", { data: data });
  socket.on("client-ack", (args) => {
    console.log(args);
  });
});
