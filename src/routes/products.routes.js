const { Router } = require('express');
const {
  listAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
} = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get('/:id', getOneProduct);
productsRouter.put('/:id', updateProduct);

productsRouter.get('/', listAllProducts);
productsRouter.post('/', createProduct);

module.exports = productsRouter;
