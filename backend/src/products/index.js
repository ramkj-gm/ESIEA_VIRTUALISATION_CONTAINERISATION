import express from "express";
import { connection } from "../db.js";

const router = express.Router({});

// list all products
router.get("/", async (req, res) => {
  try {
    const { deleted } = req.query;
    let condition = "";
    let dbParams = [];
    if (deleted != undefined) {
      condition = "where deleted = ?";
      dbParams.push(deleted);
    }
    const [results] = await connection.query(
      `SELECT * from products ${condition}`,
      dbParams
    );
    res.send({
      data: results
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
});

// get product by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      'SELECT * from products where id = ?', [id]
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
    console.log(e);
    res.status(500).send({ error: e });
  }
});

// create new product
router.post("/", async (_req, res) => {
  try {
    const { name, description, price, has_available_quantity, quantity, available_quantity } = req.body;
    const [results, fields] = await connection.execute(
      "INSERT INTO products `name`, `description`, `price`, `has_available_quantity`, `quantity`, `available_quanity`)  VALUES (?,?,?,?,?,?,?)",
      [name, description, price, has_available_quantity, quantity, available_quantity]
    );

    res.status(201).send({
      message: "Entity added to the db",
      entity: body
    })

  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
});

// update product by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, has_available_quantity, quantity, available_quantity } = req.body;
    console.log(req.body);
    const [results] = await connection.query(
      'UPDATE `products` SET `name` = ?, `description` = ?, `price` = ?, `has_available_quantity` = ?, `quantity` = ?, `available_quantity` = ? where id = ? LIMIT 1',
      [name, description, price, has_available_quantity, quantity, available_quantity, id]);
    res.send(results);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      'UPDATE products SET deleted = ? where id = ?', [1, id]
    );
    res.send(results);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
});

// recover product
router.put("/:id/recover", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection.execute(
      'UPDATE products SET deleted = ? where id = ?', [0, id]
    );
    res.send(results);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
});

export default router;
