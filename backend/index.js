import express from "express";
import { PORT } from "./src/env-vars.js";
import healthRouter from "./src/health.js";
import productsRouter from "./src/products/index.js";
import { initDBConnection } from "./src/db.js";

const app = express();

app.use("/health", healthRouter);
app.use("/v1/products", productsRouter);

app.listen(PORT, async() => {
  console.log(`listening on port ${PORT}`);
  try{
    await initDBConnection();
  }catch(e){
    console.log("connection to db could not be established", e);
  }
});
