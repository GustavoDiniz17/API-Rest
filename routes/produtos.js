const express = require("express");
const router = express.Router();


// RETORNA TODOS OS PRODUTOS
router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "Retorna todos os produto",
  });
});

//INSERE UM PRODUTO
router.post("/", (req, res, next) => {
  res.status(201).send({
    message: "Insere um produto",
  });
});


//RETORNA OS DADOS DE UM PRODUTO
router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;
  if (id == "especial") {
    res.status(200).send({
      message: "Você encontrou o ID especial",
      id : id,
    });
  } else {res.status(200).send({
    message: "Você passou um ID",
    id: id,
  });
} 
});

//ALTERA UM PRODUTO
router.patch("/", (req, res, next) => {
    res.status(201).send({
      message: "Produto alterado",
    });
  });

  //EXCLUI UM PRODUTO
  router.delete("/", (req, res, next) => {
    res.status(201).send({
      message: "Produto excluido",
    });
  });


module.exports = router;
