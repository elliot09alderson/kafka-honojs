import { kafakaConfig } from "./config/kafka.config";
import { consumeTestMessages } from "./services/consumeTestMessages";

export const startServices = async () => {
  try {
    const kafka = new kafakaConfig(["localhost:9092"]);
    await kafka.connect();
    await kafka.subscribeToTopic("test-topic");
    await consumeTestMessages(kafka);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
