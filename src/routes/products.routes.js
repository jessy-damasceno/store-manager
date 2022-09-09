const { Router } = require('express');
const { listAllProducts } = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get('/', listAllProducts);

module.exports = productsRouter;
