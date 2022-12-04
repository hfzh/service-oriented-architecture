import express, { json } from "express";

const app = express();

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
    nama: "Mutiara Rifliansyah Nuraisyah Dinda",
    nrp: "5027201054",
  },
];

app.use(json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

app.get("/group-member", (req, res) => {
  res.json({
    status: true,
    message: "",
    data: data,
  });
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
