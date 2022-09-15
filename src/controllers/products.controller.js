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

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProduct({ id, name });

  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  return res.sendStatus(204);
};

const getByQuery = async (req, res) => {
  const { q } = req.query;
  const products = await productsService.getByQuery(q);

  return res.status(200).json(products);
};

module.exports = {
  listAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getByQuery,
};
