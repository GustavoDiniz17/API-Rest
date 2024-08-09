const express = require("express");
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const ProdutosController =require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, './uploads/');
    },
    filename: function (req, file, cb){
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  } 
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.get("/", ProdutosController.getProdutos);
router.post("/", login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postProdutos);
router.get("/:id_produtos", ProdutosController.getUmProdutos);
router.patch("/", login.obrigatorio, ProdutosController.patchProdutos);
router.delete("/", login.obrigatorio, ProdutosController.deleteProdutos);

module.exports = router;
