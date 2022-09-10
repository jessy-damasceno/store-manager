const productsService = require('../services/products.service');
const { mapError } = require('../utils/errorMap');

const listAllProducts = async (_req, res) => {
  const products = await productsService.listAll();

  return res.status(200).json(products);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  getOneProduct,
};
