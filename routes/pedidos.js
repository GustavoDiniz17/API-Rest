const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      console.error("Error connecting to the database:", error);
      return res.status(500).send({ error: error });
    }
    conn.query(
      `SELECT  pedidos.id_pedido,
                    pedidos.quantidade,
                    produtos.id_produtos,
                    produtos.nome,
                    produtos.preco
               FROM pedidos
         INNER JOIN produtos
                 ON produtos.id_produtos = pedidos.id_produtos;`,
      (error, result, fields) => {
        if (error) {
          console.error("Error executing the query:", error);
          return res.status(500).send({ error: error });
        }
        const response = {
          pedidos: result.map((pedidos) => {
            return {
              id_pedido: pedidos.id_pedido,
              quantidade: pedidos.quantidade,
              produtos :{
                id_produtos: pedidos.id_produtos,
                nome : pedidos.nome,
                preco : pedidos.preco,
              },
              request: {
                tipo: "GET",
                descricao: "Retorna os detalhes de um pedido específico",
                url: "http://localhost:3000/pedidos/" + pedidos.id_pedido,
              },
            };
          }),
        };

        return res.status(200).send(response);
      }
    );
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM produtos WHERE id_produtos = ?",
      [req.body.id_produtos],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res.status(404).send({
            message: "Produto não encontrado",
          });
        }

        const query =
          "INSERT INTO pedidos (id_produtos, quantidade) VALUES (?, ?)";
        const values = [req.body.id_produtos, req.body.quantidade];

        conn.query(query, values, (error, result, fields) => {
          conn.release();
          if (error) {
            console.error("Error executing the query:", error);
            return res.status(500).send({ error: error });
          }
          const response = {
            message: "Pedido inserido com sucesso",
            pedidoCriado: {
              id_pedido: result.id_pedido,
              id_produtos: req.body.id_produtos,
              quantidade: req.body.quantidade,
              request: {
                tipo: "GET",
                descricao: "Retorna todos os pedidos",
                url: "http://localhost:3000/pedidos",
              },
            },
          };

          return res.status(201).send(response);
        });
      }
    );
  });
});

router.get("/:id_pedido", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM pedidos WHERE id_pedido= ?;",
      [req.params.id_pedido],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }

        if (result.length == 0) {
          return res.status(404).send({
            message: "Não foi encontrado pedido com este ID",
          });
        }
        const response = {
          ppedido: {
            id_pedido: result[0].id_pedido,
            id_produtos: result[0].id_produtos,
            quantidade: result[0].quantidade,
            request: {
              tipo: "GET",
              descricao: "Retorna os detalhes de um pedido especifico",
              url: "http://localhost:3000/pedidos/" + result[0].id_pedido,
            },
          },
        };

        return res.status(200).send(response);
      }
    );
  });
});

router.patch("/", (req, res, next) => {
  res.status(201).send({
    message: "Pedido excluido",
  });
});

router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `DELETE FROM pedidos WHERE id_pedido = ?`,
      [req.body.id_pedido],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Pedido excluido com sucesso",
          request: {
            tipo: "POST",
            descricao: "Insere um pedido",
            url: "http://localhost:3000/pedidos",
            body: {
              id_produtos: "Number",
              quantidade: "Number",
            },
          },
        };

        res.status(202).send(response);
      }
    );
  });
});

module.exports = router;
