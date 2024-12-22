import express from "express";
import { connection } from "../db.js";

const router = express.Router({});

// list all products
router.get("/", async (req, res) => {
  try {
    const { deleted } = req.query;
    let condition = "";
    let dbParams = [];
    if(deleted != undefined){
      condition = "where deleted = ?";
      dbParams.push(deleted);
    }
    const [results] = await connection.query(
      `SELECT * from articles ${condition}`,
      dbParams
    );
    res.send({
      data: results
    });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

// get product by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      'SELECT * from articles where id_articles = ?', [id]
    );
    if (results.length) {
      res.send(results[0]);
    } else {
      res.status(404).send({
        error: {
          message: "Product not found"
        }
      });
    }

  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export default router;
