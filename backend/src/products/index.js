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

export default router;
