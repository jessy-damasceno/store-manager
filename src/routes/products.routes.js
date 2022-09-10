const { Router } = require('express');
const {
  listAllProducts,
  getOneProduct,
  createProduct,
} = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get('/:id', getOneProduct);

productsRouter.get('/', listAllProducts);

productsRouter.post('/', createProduct);

module.exports = productsRouter;
