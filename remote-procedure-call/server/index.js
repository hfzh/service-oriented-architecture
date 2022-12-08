import path from "path";
import { fileURLToPath } from "url";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.resolve(__dirname, "../proto");
const GREET_PROTO_PATH = path.resolve(PROTO_PATH, "greet.proto");

const greetPackageDefinition = protoLoader.loadSync(GREET_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const greetPackage = grpc.loadPackageDefinition(
  greetPackageDefinition
).greetPackage;

const main = () => {
  const server = new grpc.Server();
  server.addService(greetPackage.Greet.service, {
    greeter: (req, res) => {
      res(null, { msg: `Hello, ${req.request.name}!` });
    },
  });
  server.bindAsync(
    `localhost:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(`Server started listening on port ${port}`);
      server.start();
    }
  );
};

main();
