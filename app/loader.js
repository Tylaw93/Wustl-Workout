import { MongoClient } from "mongodb";
import config from "./config.js";

const client = new MongoClient(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000"
);

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
