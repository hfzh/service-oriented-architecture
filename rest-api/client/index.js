import axios from "axios";

const PORT = 3000;

let [, , name] = process.argv;
name = name ?? "World";

(async () => {
  const res = await axios.post(`http://localhost:${PORT}/greet`, {
    name: name,
  });
  console.log(res.data);
})();
