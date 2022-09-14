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

async function listAll() {
  const productsList = await salesModel.getSales();

  return productsList;
}

async function getSaleById(saleId) {
  const sale = await salesModel.getSaleById(saleId);

  if (sale.length > 0) {
    return { type: null, message: sale };
  }
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
}

async function deleteSale(saleId) {
  const error = await getSaleById(saleId);

  if (error.type) {
    return error;
  }

  await salesModel.deleteSale(saleId);

  return { type: null, message: null };
}

async function updateSale(saleId, payload) {
  const error = validations.validateNewSale(payload);
  if (error.type) {
    return error;
  }

  const isProducts = await isProductsVerify(payload);
  if (!isProducts) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const notSale = await getSaleById(saleId);
  if (notSale.type) {
    return notSale;
  }

  await Promise.all(payload.map((e) => salesModel.update({ saleId, ...e })));

  return { type: null, message: { saleId, itemsUpdated: payload } };
}

module.exports = {
  createSale,
  listAll,
  getSaleById,
  deleteSale,
  updateSale,
};
