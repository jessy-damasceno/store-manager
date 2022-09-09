const productsModel = require('../models/products.model');

async function listAll() {
  const productsList = await productsModel.findAll();

  return productsList;
}

module.exports = {
  listAll,
};
