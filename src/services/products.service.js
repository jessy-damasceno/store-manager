const productsModel = require('../models/products.model');
const validations = require('./validations/validations');

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

async function createProduct(productName) {
  const error = validations.validateNewProduct(productName);

  if (error.type) {
    return error;
  }

  const insertId = await productsModel.insert(productName);

  return {
    type: null,
    message: { id: insertId, name: productName },
  };
}

async function updateProduct({ id, name }) {
  const response = await getProductById(id);
  if (response.type) {
    return response;
  }

  const error = validations.validateNewProduct(name);

  if (error.type) {
    return error;
  }

  const { result } = await productsModel.update({ name, id });

  return { type: null, message: result }; 
}

module.exports = {
  listAll,
  getProductById,
  createProduct,
  updateProduct,
};
