const { Router } = require('express');
const {
  listAllProducts,
  getOneProduct,
} = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get('/', listAllProducts);

productsRouter.get('/:id', getOneProduct);

module.exports = productsRouter;
