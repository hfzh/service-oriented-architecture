import path from "path";
import { fileURLToPath } from "url";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

let [, , name] = process.argv;
name = name ?? "World";

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

const client = new greetPackage.Greet(
  `localhost:${PORT}`,
  grpc.credentials.createInsecure()
);

client.greeter({ name: name }, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
