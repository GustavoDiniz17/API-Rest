const express = require("express");
const router = express.Router();


// RETORNA TODOS OS PEDIDOS
router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "Retorna os pedidos",
  });
});

//INSERE UM PEDIDOS
router.post("/", (req, res, next) => {
  res.status(201).send({
    message: "O pedido foi criado",
  });
});


//RETORNA OS DADOS DE UM PEDIDO
router.get("/:id_pedido", (req, res, next) => {
  const id = req.params.id_pedido;
    res.status(200).send({
      message: "Detales do pedido",
      id : id,
    });
  });

//ALTERA UM PEDIDO
router.patch("/", (req, res, next) => {
    res.status(201).send({
      message: "Pedido excluido",
    });
  });

  //EXCLUI UM PEDIDO
  router.delete("/", (req, res, next) => {
    res.status(201).send({
      message: "Usando o DELETE dentro da rota de pedidos",
    });
  });


module.exports = router;
