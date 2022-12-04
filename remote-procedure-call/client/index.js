import path from "path";
import { fileURLToPath } from "url";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

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

const client = new groupProto.Group(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

client.getGroupMember(null, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});
