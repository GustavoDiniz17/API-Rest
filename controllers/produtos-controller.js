const mysql = require("../mysql").pool;

exports.getProdutos =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {return res.status(500).send({ error: error });}
      conn.query("SELECT * FROM produtos;", 
        (error, result, fields) => {
        if (error) {return res.status(500).send({ error: error });}
        const response = {
          quantidade: result.length,
          produtos: result.map(prod => {
            return {
              id_produtos: prod.id_produtos,
              nome: prod.nome,
              preco: prod.preco,
              imagem_produto: prod.imagem_produto,
              request: {
                tipo: 'GET',
                descricao: 'Retorna os detalhes de um produtos especifico',
                url: 'http://localhost:3000/produtos/' + prod.id_produtos 
  
              }
            }
          })
        }
  
        return res.status(200).send(response);
      });
    });
  };

  exports.postProdutos =  (req, res, next) => {
    console.log(req.usuario);
    console.log(req.file);
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        "INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)",
        [
          req.body.nome, 
          req.body.preco,
          req.file.path
        ],
        (error, result, field) => {
          conn.release();
          if (error) {return res.status(500).send({ error: error }); }
          const response = {
            message: 'Produto Inserido com sucesso',
            produtoCriado: {
              id_produtos: result.id_produtos,
              nome: req.body.nome,
              preco: req.body.preco,
              imagem_produto: req.file.path,
              request: {
                tipo: 'GET',
                descricao: 'Retorna todos os produtos',
                url: 'http://localhost:3000/produtos'
              }
            }
          }
  
          return res.status(201).send(response);
        }
      );
    });
  };

  exports.getUmProdutos =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        "SELECT * FROM produtos WHERE id_produtos= ?;",
        [req.params.id_produtos],
        (error, result, fields) => {
          if (error) {return res.status(500).send({ error: error }); }
          
          if (result.length == 0 ) {
            return res.status(404).send({
              message: 'Não foi encontrado produto com este ID'
            })
          }
          const response = {
            produto: {
              id_produtos: result[0].id_produtos,
              nome: result[0].nome,
              preco: result[0].preco,
              imagem_produto: result[0].imagem_produto,
              request: {
                tipo: 'GET',
                descricao: 'Retorna os detalhes de um produtos especifico',
                url: 'http://localhost:3000/produtos/' + result[0].id_produtos 
  
              }
            }
          }
  
          return res.status(200).send(response);
        }
      );
    });
  };

  exports.patchProdutos =  (req, res, next) => {
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
        (error, result, field) => {
          conn.release();
          if (error) {return res.status(500).send({ error: error }) }
          const response = {
            message: 'Produto atualizado com sucesso',
            produtoAtualizado: {
              id_produtos: req.body.id_produtos,
              nome: req.body.nome,
              preco: req.body.preco,
              request: {
                tipo: 'GET',
                descricao: 'Retorna os detalhes de um produtos especifico',
                url: 'http://localhost:3000/produtos/' + req.body.id_produtos
  
              }
            }
          }
  
          return res.status(202).send(response);
        }
      );
    }); 
  };

  exports.deleteProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {return res.status(500).send({ error: error })}
      conn.query(
        `DELETE FROM produtos WHERE id_produtos = ?`,
        [req.body.id_produtos],
        (error, result, field) => {
          conn.release();
          if (error) {return res.status(500).send({ error: error }) }
          const response = {
            message: "Produto excluido com sucesso",
            request: {
              tipo: "POST",
              descricao: "Insere um produto",
              url: "http://localhost:3000/produtos",
              body: {
                nome: "String",
                preco: "Number"
              }
            }
          }
  
          res.status(202).send(response);
        }
      );
    }); 
  };