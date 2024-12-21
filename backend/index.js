import express from "express";
import { PORT } from "./src/env-vars.js";
import healthRouter from "./src/health.js";

const app = express();

app.use("/health", healthRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
