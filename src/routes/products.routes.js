const { Router } = require('express');
const {
  listAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.route('/:id')
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProduct);

productsRouter.route('/')
  .get(listAllProducts)
  .post(createProduct);

module.exports = productsRouter;
