const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "Retorna os pedidos",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).send({
    message: "O pedido foi criado",
  });
});

router.get("/:id_pedido", (req, res, next) => {
  const id = req.params.id_pedido;
  res.status(200).send({
    message: "Detales do pedido",
    id: id,
  });
});

router.patch("/", (req, res, next) => {
  res.status(201).send({
    message: "Pedido excluido",
  });
});

router.delete("/", (req, res, next) => {
  res.status(201).send({
    message: "Usando o DELETE dentro da rota de pedidos",
  });
});

module.exports = router;
