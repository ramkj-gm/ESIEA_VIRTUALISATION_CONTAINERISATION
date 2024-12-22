import express from "express";
import { connection } from "../db.js";

const router = express.Router({});

// list all admins
router.get("/", async (req, res) => {
  try {
    const [results] = await connection.query(
      `SELECT * from admin`
    );
    res.send({
      data: results
    });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

// get admin by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      'SELECT * from admin where id_admin = ?', [id]
    );
    if (results.length) {
      res.send(results[0]);
    } else {
      res.status(404).send({
        error: {
          message: "admin not found"
        }
      });
    }

  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export default router;
