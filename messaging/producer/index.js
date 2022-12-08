import { Kafka } from "kafkajs";

const args = process.argv.slice(2);
const num = args[0] || 1;

const config = {
  //   clientId: `consumer-${date}`,
  //   groupId: `test-group`,
  topic: `the-topic`,
};

const kafka = new Kafka({
  clientId: "producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: config.topic,
    messages: [{ value: "Hello KafkaJS user!" }],
  });
};

console.log(`Running producer ${num} time`);

for (let i = 1; i <= +num; i++) {
  console.log(`Running ${i}`);
  run()
    .then(() => producer.disconnect())
    .catch(console.error);
}
