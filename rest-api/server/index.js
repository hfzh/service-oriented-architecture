import express, { json } from "express";

const app = express();

app.use(json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ msg: "App is working!" });
});

app.post("/greet", (req, res) => {
  res.json({
    msg: `Hello, ${req.body.name}!`,
  });
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
