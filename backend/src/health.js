import express from "express";
import { connection } from "./db.js";

const router = express.Router({});

//this router should accept only GET requests
router.use((_req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

// health: return a 2xx response when your server is healthy, else send a 5xx response
router.get("/", async (_req, res, _next) => {
  try {
    await connection.ping();
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      dbConnection: "OK",
      timestamp: Date.now(),
    };
    res.send(healthcheck);
  } catch (e) {
    res.status(503).send({ error: e });
  }
});

export default router;
