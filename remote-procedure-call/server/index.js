import path from "path";
import { fileURLToPath } from "url";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

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

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.resolve(__dirname, "../proto");
const GROUP_PROTO_PATH = path.resolve(PROTO_PATH, "group.proto");

const groupPackageDefiniton = protoLoader.loadSync(GROUP_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const groupProto = grpc.loadPackageDefinition(
  groupPackageDefiniton
).groupPackage;

const main = () => {
  const server = new grpc.Server();
  server.addService(groupProto.Group.service, {
    getGroupMember: (req, res) => {
      res(null, { data: data });
    },
  });
  server.bindAsync(
    `0.0.0.0:${PORT}`,
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
