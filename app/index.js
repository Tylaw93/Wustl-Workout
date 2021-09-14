import express from "express";
import morgan from "morgan";
import config from "./config.js";
import router from "./router.js";

const app = express();

app.use(morgan("dev"));

app.use(express.static("public", { extensions: ["html"] }));
app.use(express.json());

app.use("/api", router);

app.listen(config.port, () => {
  console.log(`Server 🏃🏾‍♂️ at: http://localhost:${config.port}`);
});
