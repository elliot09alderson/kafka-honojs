import { Message, Consumer, Admin, Kafka } from "kafkajs";
export class kafakaConfig {
  private kafka: Kafka;
  private consumer: Consumer;
  constructor(brokers: string[]) {
    this.kafka = new Kafka({
      clientId: "consumer-service",
      brokers: brokers,
    });

    this.consumer = this.kafka.consumer({
      groupId: "test-group-id",
    });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (error) {
      throw new Error("Something went wrong  while connecting to kafka");
    }
  }
  async disconnect() {
    try {
      await this.consumer.disconnect();
    } catch (error) {
      throw new Error("Something went wrong  while disconnecting to kafka");
    }
  }
  async subscribeToTopic(topic: string) {
    try {
      await this.consumer.subscribe({
        topic,
        fromBeginning: true,
      });
      console.log("Subscribe to topic", topic);
    } catch (error) {
      throw new Error("Something went wrong  while disconnecting to kafka");
    }
  }

  async consume(onMessage: (message: string) => void) {
    try {
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          message?.value && onMessage(message?.value?.toString());
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
