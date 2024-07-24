const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "Retorna todos os produto",
  });
});

router.post("/", (req, res, next) => {
  const produto = {
    nome: req.body.nome,
    preco: req.body.preco,
  };
  res.status(201).send({
    message: "Insere um produto",
    produtotoCriado: produto,
  });
});

router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;
  if (id == "especial") {
    res.status(200).send({
      message: "Você encontrou o ID especial",
      id: id,
    });
  } else {
    res.status(200).send({
      message: "Você passou um ID",
      id: id,
    });
  }
});

router.patch("/", (req, res, next) => {
  res.status(201).send({
    message: "Produto alterado",
  });
});

router.delete("/", (req, res, next) => {
  res.status(201).send({
    message: "Produto excluido",
  });
});

module.exports = router;
