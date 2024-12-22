import express from "express";
import { connection, initDBConnection } from "./db.js";

const router = express.Router({});

//this router should accept only GET requests
router.use((_req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

// health: return a 2xx response when your server is healthy, else send a 5xx response
router.get("/", async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  let status = 200;
  if (!connection) {
    try {
      await initDBConnection();
    } catch (e) {
      healthcheck.dbConnection = "KO";
      healthcheck.dbConnectionErr = e;
      status = 503;
    }
  }
  try {
    await connection.ping();
    healthcheck.dbConnection = "OK";
  } catch (e) {
    healthcheck.dbConnection = "KO";
    healthcheck.dbConnectionErr = e;
    status = 503;
    connection = undefined;
  }
  res.status(status).send(healthcheck);
});

export default router;
