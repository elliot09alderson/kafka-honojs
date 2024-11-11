import { Kafka, Producer, Admin, Message } from "kafkajs";

export class KafkaConfig {
  private kafka: Kafka;
  private producer: Producer;
  private admin: Admin;

  constructor(brokers: string[]) {
    this.kafka = new Kafka({
      clientId: "producer-service",
      brokers: brokers,
    });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
  }
  async connect() {
    try {
      await this.producer.connect();
      await this.admin.connect();
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
  async createTopics(topic: string) {
    try {
      const topicExists = await this.admin.listTopics();
      console.log(topicExists);
      if (!topicExists.includes(topic)) {
        await this.admin.createTopics({
          topics: [{ topic }],
        });
        console.log("topic created ");
      } else {
        console.log("topic already created");
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async produceMessages(topic: string, messages: Message[]) {
    try {
      await this.producer.send({
        topic,
        messages,
      });
    } catch (error) {
      console.log("sdasdksdajnds k asdnkasdn ");
      throw new Error(`${error}`);
    }
  }

  async disconnect() {
    try {
      await this.producer.disconnect();
      await this.admin.disconnect();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
