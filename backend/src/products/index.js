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
      `SELECT * from products ${condition}`,
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
    res.status(500).send({ error: e });
  }
});

// create new product
router.post("/", async (_req, res, _next) => {
  try {
    const body = req.body;
    if (!body.nom_articles || !body.description_articles || !body.prix_articles || !body.disponible_articles || !body.nombre_articles || !body.nombre_dispsonible_articles || !body.image_articles || !body.deleted) {
      res.status(400).send("Bad Request");
      return
    }
    const [results, fields] = await connection.query(
      "INSERT INTO products `name`, `description`, `price`, `has_available_quantity`, `quantity`, `available_quanity`, `image_path`)  VALUES (?,?,?,?,?,?,?,?)", body.id_articles, body.nom_articles, body.description_articles, body.prix_articles, body.disponible_articles, body.nombre_articles, body.nombre_disponible_articles, body.image_articles
    );

    res.status(201).send({
      message: "Entity added to the db",
      entity: body
    })

  } catch (e) {
    res.status(503).send({ error: e });
  }
});

// update product by id
router.post("/:id", async (_req, res, _next) => {
  try {
    const id = req.params;
    const [results, fields] = await connection.query(
      'UPDATE articles SET nom_articles = ?, description_articles = ?, prix_articles = ?, disponible_articles = ?, nombre_articles = ?, nombre_disponible_articles = ?, image_articles = ? where id_articles = ?', body.id_articles, body.nom_articles, body.description_articles, body.prix_articles, body.disponible_articles, body.nombre_articles, body.nombre_disponible_articles, body.image_articles, body.id_articles
    );
    res.send(results);
  } catch (e) {
    res.status(503).send({ error: e });
  }
});

// delete product
router.delete("/:id", async (_req, res, _next) => {
  try {
    const { id } = req.params;
    const [results, fields] = await connection.query(
      'UPDATE articles SET deleted = ? where id_articles = ?', body.deleted, body.id_articles, body.nom_articles, body.description_articles, body.prix_articles, body.disponible_articles, body.nombre_articles, body.nombre_disponible_articles, body.image_articles, body.id_articles
    );
    res.send(results);
  } catch (e) {
    res.status(503).send({ error: e });
  }
});

export default router;
