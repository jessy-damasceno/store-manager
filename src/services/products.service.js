const productsModel = require('../models/products.model');

async function listAll() {
  const productsList = await productsModel.findAll();

  return productsList;
}

async function getProductById(productId) {
  const product = await productsModel.findById(productId);

  if (product) {
    return { type: null, message: product };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
}

module.exports = {
  listAll,
  getProductById,
};
