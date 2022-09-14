const { Router } = require('express');
const {
  listAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
} = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.route('/:id')
  .get(getOneProduct)
  .put(updateProduct);

// productsRouter.get('/:id', getOneProduct);
// productsRouter.put('/:id', updateProduct);

productsRouter.route('/')
  .get(listAllProducts)
  .post(createProduct);

// productsRouter.get('/', listAllProducts);
// productsRouter.post('/', createProduct);

module.exports = productsRouter;
