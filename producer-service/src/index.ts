import { Hono } from "hono";
import { kafka, startServices } from "./start.services";

const app = new Hono();
startServices();

app.post("/produce-messages", async (c) => {
  const { message } = await c.req.json();

  if (!message) {
    return c.json({ message: "required" }, 401);
  }

  try {
    await kafka.produceMessages("test-topic", [{ value: message }]);
    return c.json(
      {
        success: true,
        message: "message sent successfully",
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json(
      {
        error,
      },
      500
    );
  }
});

export default app;
