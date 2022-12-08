import soap from "soap";
import express from "express";
import fs from "fs";

const PORT = 3000;

const serviceObject = {
  GreeterService: {
    GreeterServiceSoapPort: {
      Greeter: (args) => {
        console.log(args.name);
        return `Hello, ${args.name}!`;
      },
    },
    GreeterServiceSoap12Port: {
      Greeter: (args) => {
        console.log(args.name);
        return `Hello ${args.name}!`;
      },
    },
  },
};

const xml = fs.readFileSync("../service.wsdl", "utf8");

let app = express();

// root handler
app.get("/", function (req, res) {
  res.send("App is working!");
});

// Launch the server and listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  const WSDL_PATH = "/wsdl";
  soap.listen(app, WSDL_PATH, serviceObject, xml);
  console.log(
    `Check http://localhost:${PORT}${WSDL_PATH}?wsdl to use the service`
  );
});
