const salesModel = require('../models/sales.model');
const productsService = require('./products.service');
const validations = require('./validations/validations');

const isProductsVerify = async (payload) => {
  const productsList = await Promise
    .all(payload.map(({ productId }) => productsService.getProductById(productId)));
  
  const isProducts = productsList.every((e) => e.type === null);

  return isProducts;
};

const createSale = async (payload) => {
  const error = validations.validateNewSale(payload);

  if (error.type) {
    return error;
  }

  const isProducts = await isProductsVerify(payload);
  if (!isProducts) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const { saleId } = await salesModel.insertSaleProducts(payload);

  return {
    type: null,
    message: { id: saleId, itemsSold: payload },
  };
};

module.exports = {
  createSale,
};
