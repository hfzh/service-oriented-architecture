import { Kafka } from "kafkajs";

const date = Date.now();

const config = {
  clientId: `admin-${date}`,
  groupId: `test-group`,
  topic: `the-topic`,
};

const kafka = new Kafka({
  clientId: config.clientId,
  brokers: ["localhost:9092"],
});

const admin = kafka.admin();

const run = async () => {
  await admin.connect();

  const topics = await admin.listTopics();

  if (topics.includes(config.topic)) {
    await admin.deleteTopics({ topics: [config.topic] });
  }

  await admin.createTopics({
    topics: [{ topic: config.topic }],
    waitForLeaders: true,
  });

  await admin.createPartitions({
    topicPartitions: [{ topic: config.topic, count: 4 }],
  });
};

run().catch(console.error);
