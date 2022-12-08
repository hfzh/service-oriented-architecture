import soap from "soap";

const PORT = 3000;
const url = `http://localhost:${PORT}/wsdl?wsdl`;

let [, , name] = process.argv;
name = name ?? "World";

let args = { name: name };

soap.createClient(url, (err, client) => {
  if (err) {
    throw err;
  }
  client.Greeter(args, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
});
