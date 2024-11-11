import { kafakaConfig } from "../config/kafka.config";

export const consumeTestMessages = async (kafka: kafakaConfig) => {
  try {
    await kafka.consume((message) => {
      console.log("messages --- > ", message);
    });
  } catch (error) {
    console.log("error in consuming messages", error);
  }
};
