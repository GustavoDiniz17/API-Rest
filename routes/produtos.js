const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM produtos;", (error, resultado, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({ response: resultado });
    });
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO produtos (nome, preco) VALUES (?,?)",
      [req.body.nome, req.body.preco],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        res.status(201).send({
          message: "produto inserido com sucesso",
          id_produtos: resultado.insertId,
        });
      }
    );
  });
});

router.get("/:id_produtos", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM produtos WHERE id_produtos= ?;",
      [req.params.id_produtos],
      (error, resultado, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
});

router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {return res.status(500).send({ error: error })}
    conn.query(
      `UPDATE produtos
          SET nome        = ?,
              preco       = ?
        WHERE id_produtos  = ?`,
      [
        req.body.nome,
        req.body.preco, 
        req.body.id_produtos
      ],
      (error, resultado, field) => {
        conn.release();
        if (error) {return res.status(500).send({ error: error }) }

        res.status(202).send({
          message: "Produto alterado com sucesso",
          id_produtos: resultado.insertId,
        });
      }
    );
  }); 
});

router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {return res.status(500).send({ error: error })}
    conn.query(
      `DELETE FROM produtos WHERE id_produtos = ?`,
      [req.body.id_produtos],
      (error, resultado, field) => {
        conn.release();
        if (error) {return res.status(500).send({ error: error }) }

        res.status(202).send({
          message: "Produto excluido com sucesso",
          id_produtos: resultado.insertId,
        });
      }
    );
  }); 
});

module.exports = router;
