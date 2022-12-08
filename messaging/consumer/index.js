import { Kafka } from "kafkajs";

const date = Date.now();

const config = {
  clientId: `consumer-${date}`,
  groupId: `test-group`,
  topic: `the-topic`,
};

const kafka = new Kafka({
  clientId: config.clientId,
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: config.groupId });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: config.topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
