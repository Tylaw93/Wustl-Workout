import { MongoClient } from "mongodb";
import config from "./config.js";

const client = new MongoClient(config.db, { useNewUrlParser: true });

client
  .connect()
  .then(() => {
    console.info("MongoDB Client 🏃🏾‍♂️");
  })
  .catch((err) => {
    console.error("Error starting MongoDB Client", err.message);

    process.exit(1);
  });

process.on("SIGINT", () => {
  client.close().then(() => {
    console.info("MongoDB Client disconnected");
    process.exit(0);
  });
});

export default client;
