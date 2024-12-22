import express from "express";
import { connection } from "../db.js";

const router = express.Router({});

// list all clients
router.get("/", async (req, res) => {
  try {
    const [results] = await connection.query(
      `SELECT * from client`
    );
    res.send({
      data: results
    });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

// get client by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      'SELECT * from client where id_client = ?', [id]
    );
    if (results.length) {
      res.send(results[0]);
    } else {
      res.status(404).send({
        error: {
          message: "client not found"
        }
      });
    }

  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export default router;
