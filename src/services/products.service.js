const productsModel = require('../models/products.model');

async function listAll() {
  const productsList = await productsModel.findAll();

  return productsList;
}

async function getProductById(productId) {
  const product = await productsModel.findById(productId);

  return product;
}

module.exports = {
  listAll,
  getProductById,
};
