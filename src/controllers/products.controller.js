const productsService = require('../services/products.service');

const listAllProducts = async (_req, res) => {
  const products = await productsService.listAll();

  return res.status(200).json(products);
};

module.exports = {
  listAllProducts,
};
